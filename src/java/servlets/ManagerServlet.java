/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlets;

import entity.Model;
import entity.Role;
import entity.User;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.util.List;
import javax.ejb.EJB;
import javax.json.Json;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import javax.json.JsonReader;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.http.Part;
import jsonbuilders.ModelJsonBuilder;
import session.ModelFacade;
import session.UserRolesFacade;

/**
 *
 * @author Danja
 */
@WebServlet(name = "ManagerServlet", urlPatterns = {
    "/newModel",
    "/editModel",
    "/getListModels"
})
@MultipartConfig
public class ManagerServlet extends HttpServlet {
    @EJB private ModelFacade modelFacade;
    @EJB private UserRolesFacade userRolesFacade;

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        request.setCharacterEncoding("UTF-8");
        JsonObjectBuilder job = Json.createObjectBuilder();
        HttpSession session = request.getSession(false);
        if(session == null){
            job.add("info", "You are not authorized!");
                    job.add("auth", false);
                    try (PrintWriter out = response.getWriter()) {
                        out.println(job.build().toString());
                    }
                    return;
        }
        User authUser = (User) session.getAttribute("authUser");
        if(authUser == null){
            job.add("info", "You are not authorized!");
                    job.add("auth", false);
                    try (PrintWriter out = response.getWriter()) {
                        out.println(job.build().toString());
                    }
                    return;
        }
        if(!userRolesFacade.isRole("MANAGER",authUser)){
            job.add("info", "You do not have the required permissions!");
                    job.add("auth", false);
                    try (PrintWriter out = response.getWriter()) {
                        out.println(job.build().toString());
                    }
                    return;
        }
        String path = request.getServletPath();
        switch(path) {
            case "/newModel":
                Part part = request.getPart("imageFile");
                StringBuilder pathToUploadUserDir = new StringBuilder();
                pathToUploadUserDir.append("D:\\uploadDir\\ShoesShop") 
                                   .append(File.separator)
                                   .append(authUser.getId().toString()); 
                File mkDirFile = new File(pathToUploadUserDir.toString());
                mkDirFile.mkdirs();
                StringBuilder pathToUploadFile = new StringBuilder();
                pathToUploadFile.append(pathToUploadUserDir.toString())
                                .append(File.separator)
                                .append(getFileName(part));
                File file = new File(pathToUploadFile.toString());
                try(InputStream fileContent = part.getInputStream()){ 
                     Files.copy(
                             fileContent,
                             file.toPath(),
                             StandardCopyOption.REPLACE_EXISTING 
                     );
                 }
                String name = request.getParameter("name");
                String brand = request.getParameter("brand");
                String size = request.getParameter("size");
                String price = request.getParameter("price");
                String quantity = request.getParameter("quantity");
                if("".equals(name) || "".equals(brand)
                        || "".equals(size) || "".equals(price)
                        || "".equals(quantity)){
                    job.add("status", false);
                    job.add("info", "All fields must be filled!");
                    try (PrintWriter out = response.getWriter()) {
                        out.println(job.build().toString());
                    }
                    break;
                }
                Model model = new Model();
                model.setName(name);
                model.setBrand(brand);
                model.setSize(Integer.parseInt(size));
                model.setPathToImage(pathToUploadFile.toString());
                model.setPrice(Integer.parseInt(price));
                model.setQuantity(Integer.parseInt(quantity));
                modelFacade.create(model);
                job.add("info", "Shoes added!");
                job.add("status", true);
                try (PrintWriter out = response.getWriter()) {
                   out.println(job.build().toString());
                }
                break;
            case "/editModel":
                JsonReader jsonReader1 = Json.createReader(request.getReader());
                JsonObject jo1 = jsonReader1.readObject();
                String id1 = jo1.getString("id","");
                String newName = jo1.getString("newName","");
                String newBrand = jo1.getString("newBrand","");
                String newSize = jo1.getString("newSize","");
                String newQuantity = jo1.getString("newQuantity","");
                String newPrice = jo1.getString("newPrice","");
                                if("".equals(newName) || "".equals(newBrand)
                        || "".equals(newSize) || "".equals(newQuantity)
                        || "".equals(newPrice)){
                    job.add("status", false);
                    job.add("info", "All fields must be filled!");
                    try (PrintWriter out = response.getWriter()) {
                        out.println(job.build().toString());
                    }
                    break;
                }
                Model newModel = modelFacade.find(Long.parseLong(id1));
                newModel.setName(newName);
                newModel.setBrand(newBrand);
                newModel.setSize(Integer.parseInt(newSize));
                newModel.setQuantity(Integer.parseInt(newQuantity));
                newModel.setPrice(Integer.parseInt(newPrice));
                modelFacade.edit(newModel);
                job.add("info", "Shoes successfully changed");
                job.add("status", true);
                job.add("model", new ModelJsonBuilder().getJsonModel(newModel));
                try (PrintWriter out = response.getWriter()) {
                   out.println(job.build().toString());
                } 
                
                break;
            case "/getListModels":
                List<Model> models = modelFacade.findAll();
                ModelJsonBuilder mjb = new ModelJsonBuilder();
                if(!models.isEmpty()) {
                    job.add("status", true)
                            .add("options", mjb.getJsonArrayModel(models));
                }
                try(PrintWriter out = response.getWriter()) {
                    out.println(job.build().toString());
                }
                break;
        }
    }
            private String getFileName(Part part){
        final String partHeader = part.getHeader("content-disposition");
        for (String content : part.getHeader("content-disposition").split(";")){
            if(content.trim().startsWith("filename")){
                return content
                        .substring(content.indexOf('=')+1)
                        .trim()
                        .replace("\"",""); 
            }
        }
        return null;
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}

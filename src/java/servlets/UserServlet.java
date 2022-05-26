/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlets;

import entity.AccountData;
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
import javax.json.JsonObjectBuilder;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.http.Part;
import jsonbuilders.AccountDataJsonBuilder;
import session.AccountDataFacade;
import session.RoleFacade;
import session.UserFacade;
import session.UserRolesFacade;
import tools.PasswordProtected;

/**
 *
 * @author User
 */
@WebServlet(name = "UserServlet", urlPatterns = {
    "/getListAccountData",
    "/addNewAccount",

})
@MultipartConfig
public class UserServlet extends HttpServlet {
    @EJB private UserFacade userFacade;
    @EJB private RoleFacade roleFacade;
    @EJB private UserRolesFacade userRolesFacade;
    @EJB private AccountDataFacade accountDataFacade;
    
    private PasswordProtected pp = new PasswordProtected();

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        request.setCharacterEncoding("UTF-8");
        JsonObjectBuilder job = Json.createObjectBuilder();
        HttpSession session = request.getSession(false);
        if(session == null){
            job.add("info", "You are not authorized");
                    job.add("auth", false);
                    try (PrintWriter out = response.getWriter()) {
                        out.println(job.build().toString());
                    }
                    return;
        }
        User authUser = (User) session.getAttribute("authUser");
        if(authUser == null){
            job.add("info", "You are not authorized");
                    job.add("auth", false);
                    try (PrintWriter out = response.getWriter()) {
                        out.println(job.build().toString());
                    }
                    return;
        }
        String path = request.getServletPath();
        switch (path) {
            case "/getListAccountData":
                String userId = request.getParameter("userId");
                if(!userId.equals(authUser.getId().toString())){
                    job.add("listAccountData", "")
                       .add("status", false)
                       .add("info", "You are not the person on the account");
                    break;
                }
                List<AccountData> listAccountData = accountDataFacade.findAll(authUser);
                if(listAccountData.isEmpty()){
                    job.add("listAccountData", "");
                    job.add("status", true).add("info", "List is empty");
                    try (PrintWriter out = response.getWriter()) {
                      out.println(job.build().toString());
                    } 
                    break;
                }
                AccountDataJsonBuilder adjb = new AccountDataJsonBuilder();
                job.add("listAccountData", adjb.getJsonArrayAccountData(listAccountData));
                job.add("status", true).add("info", "");
                try (PrintWriter out = response.getWriter()) {
                  out.println(job.build().toString());
                } 
                break;
            case "/addNewAccount":
               Part part = request.getPart("imageFile");
               StringBuilder pathToUploadUserDir = new StringBuilder(); 
               pathToUploadUserDir.append("D:\\uploadDir\\SPTV20WebShoeShopMozgovJS") 
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
  
               String caption = request.getParameter("caption");
               String url = request.getParameter("url");
               String login = request.getParameter("login");
               String password = request.getParameter("password");
               AccountData accountData = new AccountData();
               accountData.setCaption(caption);
               accountData.setLogin(login);
               accountData.setPassword(password);
               accountData.setUrl(url);
               accountData.setPathToImage(pathToUploadFile.toString());
               accountData.setUser(authUser);
               accountDataFacade.create(accountData);
               job.add("info", "Added new model");
               job.add("status", true);
               try (PrintWriter out = response.getWriter()) {
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

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
import jsonbuilders.UserJsonBuilder;
import jsonbuilders.RoleJsonBuilder;
import session.ModelFacade;
import session.RoleFacade;
import session.UserFacade;
import session.UserRolesFacade;
import tools.PasswordProtected;

/**
 *
 * @author Danja
 */
@WebServlet(name = "AdminServlet", urlPatterns = {
    "/getRoles",
    "/getUsersMap",
    "/setUserRole",
    
    
})
@MultipartConfig
public class AdminServlet extends HttpServlet {
    @EJB private UserFacade userFacade;
    @EJB private RoleFacade roleFacade;
    @EJB private UserRolesFacade userRolesFacade;
    @EJB private ModelFacade modelFacade;
    
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
        if(!userRolesFacade.isRole("ADMINISTRATOR",authUser)){
            job.add("info", "You do not have the required permissions!");
                    job.add("auth", false);
                    try (PrintWriter out = response.getWriter()) {
                        out.println(job.build().toString());
                    }
                    return;
        }
        String path = request.getServletPath();
        switch (path) {
            case "/getRoles":
                List<Role> listRoles = roleFacade.findAll();
                JsonArrayBuilder jab = Json.createArrayBuilder();
                for(int i = 0; i < listRoles.size(); i++){
                    JsonObjectBuilder jsonRoleBuilder = Json.createObjectBuilder();
                    jsonRoleBuilder.add("id", listRoles.get(i).getId());
                    jsonRoleBuilder.add("roleName", listRoles.get(i).getRoleName());
                    jab.add(jsonRoleBuilder);
                }
                job.add("status",true);
                job.add("roles", jab.build());
                try (PrintWriter out = response.getWriter()) {
                    out.println(job.build().toString());
                }
                break;
            case "/getUsersMap":
                List<User> listUsers = userFacade.findAll();
                jab = Json.createArrayBuilder();
                
                UserJsonBuilder ujb = new UserJsonBuilder();
                for (int i = 0; i < listUsers.size(); i++) {
                    JsonObjectBuilder jsonUserRoleBuilder = Json.createObjectBuilder();
                    jsonUserRoleBuilder.add("user", ujb.getJsonUser(listUsers.get(i)));
                    jsonUserRoleBuilder.add("role", userRolesFacade.getRoleNameUser(listUsers.get(i)));
                    jab.add(jsonUserRoleBuilder.build());
                }
                job.add("status", true);
                job.add("usersMap",jab.build());
                try (PrintWriter out = response.getWriter()) {
                    out.println(job.build().toString());
                }
                break;
            case "/setUserRole":
                try {
                    JsonReader jsonReader = Json.createReader(request.getReader());
                    JsonObject jo = jsonReader.readObject();
                    String userId = jo.getString("userId","");
                    String roleId = jo.getString("roleId","");
                    User user = userFacade.find(Long.parseLong(userId));
                    if("admin".equals(user.getLogin())){
                        job.add("status",false);
                        job.add("info", "This user cannot change role!");
                        try (PrintWriter out = response.getWriter()) {
                            out.println(job.build().toString());
                        }
                        break;
                    }
                    Role role = roleFacade.find(Long.parseLong(roleId));
                    userRolesFacade.setRoleToUser(role,user);
                        job.add("status",true);
                        job.add("user", new UserJsonBuilder().getJsonUser(user));
                        job.add("role", new RoleJsonBuilder().getJsonRole(role));
                        job.add("info", "User role "+user.getLogin()+" successfully changed!");
                } catch (IOException | NumberFormatException e) {
                    job.add("status",false);
                }
                try (PrintWriter out = response.getWriter()) {
                    out.println(job.build().toString());
                }
                
                break;
                
        }
        
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

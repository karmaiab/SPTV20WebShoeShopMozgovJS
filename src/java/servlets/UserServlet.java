
package servlets;

import entity.History;
import entity.Model;
import entity.User;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Calendar;
import java.util.List;
import javax.ejb.EJB;
import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import javax.json.JsonReader;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import jsonbuilders.UserJsonBuilder;
import jsonbuilders.ModelJsonBuilder;
import session.HistoryFacade;
import session.ModelFacade;
import session.UserFacade;
import session.UserRolesFacade;
import tools.PasswordProtected;

/**
 *
 * @author Danja
 */
@WebServlet(name = "UserServlet", urlPatterns = {
    "/editAccount",
    "/addMoney",
    "/editPassword",
    "/buyModel",
    "/getListModel"
    
})
public class UserServlet extends HttpServlet {
    @EJB private UserFacade userFacade;
    @EJB private HistoryFacade historyFacade;
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
        if(!userRolesFacade.isRole("USER",authUser)){
            job.add("info", "You do not have the required permissions!");
                    job.add("auth", false);
                    try (PrintWriter out = response.getWriter()) {
                        out.println(job.build().toString());
                    }
                    return;
        }
        String path = request.getServletPath();
        switch (path) {
            case "/buyModel":
                JsonReader jsonReader = Json.createReader(request.getReader());
                JsonObject jo = jsonReader.readObject();
                String id = jo.getString("id");
                Model currentModel = modelFacade.find(Long.parseLong(id));
                if(Integer.parseInt(authUser.getMoney())<currentModel.getPrice()){
                    job.add("info", "You do not have enough money!");
                    job.add("status", false);
                    try (PrintWriter out = response.getWriter()) {
                       out.println(job.build().toString());
                    }
                }
                currentModel.setQuantity(currentModel.getQuantity()-1);
                authUser.setMoney(Integer.toString(Integer.parseInt(authUser.getMoney())-currentModel.getPrice()));
                History history = new History();
                history.setModel(currentModel);
                history.setPurchaseModel(Calendar.getInstance().getTime());
                history.setUser(authUser);
                modelFacade.edit(currentModel);
                userFacade.edit(authUser);
                historyFacade.create(history);
                job.add("info", "Model "+currentModel.getName()+" successfully ordered!");
                job.add("status", true);
                job.add("user", new UserJsonBuilder().getJsonUser(authUser));
                try (PrintWriter out = response.getWriter()) {
                   out.println(job.build().toString());
                } 
                break;
            case "/editAccount":
                JsonReader jsonReader1 = Json.createReader(request.getReader());
                JsonObject jo1 = jsonReader1.readObject();
                int id1 = jo1.getInt("id");
                String newFirstname = jo1.getString("newFirstname","");
                String newLastname = jo1.getString("newLastname","");
                String newPhone = jo1.getString("newPhone","");
                User newUser = userFacade.find((long)id1);
                if(newUser == null){
                    job.add("info", "No such user exists!");
                    job.add("status", false);
                    try (PrintWriter out = response.getWriter()) {
                       out.println(job.build().toString());
                    }
                }
                newUser.setFirstname(newFirstname);
                newUser.setLastname(newLastname);
                newUser.setPhone(newPhone);
                //newUser.setMoney(Integer.toString(Integer.parseInt(authUser.getMoney())+Integer.parseInt(newMoney)));
                userFacade.edit(newUser);
                session.setAttribute("authUser", newUser);
                job.add("info", "Your data successfully changed!");
                job.add("status", true);
                job.add("user", new UserJsonBuilder().getJsonUser(newUser));
                try (PrintWriter out = response.getWriter()) {
                   out.println(job.build().toString());
                } 
                
                break;
            case "/addMoney":
                JsonReader jsonReader2 = Json.createReader(request.getReader());
                JsonObject jo2 = jsonReader2.readObject();
                int id2 = jo2.getInt("id");
                String newMoney = jo2.getString("newMoney","");
                newUser = userFacade.find((long)id2);
                if(newUser == null){
                    job.add("info", "No such user exists!");
                    job.add("status", false);
                    try (PrintWriter out = response.getWriter()) {
                       out.println(job.build().toString());
                    }
                }
                newUser.setMoney(Integer.toString(Integer.parseInt(authUser.getMoney())+Integer.parseInt(newMoney)));
                userFacade.edit(newUser);
                session.setAttribute("authUser", newUser);
                job.add("info", "Money were successfully added!");
                job.add("status", true);
                job.add("user", new UserJsonBuilder().getJsonUser(newUser));
                try (PrintWriter out = response.getWriter()) {
                   out.println(job.build().toString());
                } 
                
                break;
                
            case "/getListModel":
                List<Model> listModel = modelFacade.findAll();
                if(listModel.isEmpty()){
                    job.add("listModel", "");
                    job.add("status", true).add("info", "List is empty!");
                    try (PrintWriter out = response.getWriter()) {
                      out.println(job.build().toString());
                    } 
                    break;
                }
                ModelJsonBuilder mjb = new ModelJsonBuilder();
                job.add("listModel", mjb.getJsonArrayModel(listModel));
                job.add("status", true).add("info", "");
                try (PrintWriter out = response.getWriter()) {
                  out.println(job.build().toString());
                } 
                break;

            case "/editPassword":
                jsonReader2 = Json.createReader(request.getReader());
                jo2 = jsonReader2.readObject();
                id2 = jo2.getInt("id");
                String newPassword1 = jo2.getString("newPassword1","");
                String newPassword2 = jo2.getString("newPassword2","");
                if(!newPassword1.equals(newPassword2)){
                    job.add("info", "Passwords do not match!");
                    job.add("status", false);
                    try (PrintWriter out = response.getWriter()) {
                       out.println(job.build().toString());
                    } 
                }
                newUser = userFacade.find((long)id2);
                if(newUser == null){
                    job.add("info", "No such user exists!");
                    job.add("status", false);
                    try (PrintWriter out = response.getWriter()) {
                       out.println(job.build().toString());
                    } 
                }
                newPassword1=pp.passwordEncript(newPassword1, newUser.getSalt());
                if(!"".equals(newPassword1)){
                    newUser.setPassword(newPassword1);
                }
                userFacade.edit(newUser);
                session.setAttribute("authUser", newUser);
                job.add("info", "Password was successfully changed!");
                job.add("status", true);
                job.add("user", new UserJsonBuilder().getJsonUser(newUser));
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

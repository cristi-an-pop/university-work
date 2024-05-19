package org.example.lab8.servlet;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.example.lab8.dao.RouteDAO;
import org.example.lab8.dao.UserDAO;
import org.example.lab8.model.City;
import org.example.lab8.model.User;

import java.io.IOException;
import java.util.List;

@WebServlet(name = "loginServlet", value = "/login-servlet")
public class LoginServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String username = request.getParameter("username");
        String password = request.getParameter("password");

        UserDAO userDAO = new UserDAO();
        User user = userDAO.validateUser(username, password);

        if (user != null) {
            HttpSession session = request.getSession();
            session.setAttribute("user", user);
            RouteDAO routeDAO = new RouteDAO();
            session.setAttribute("cities", (List<City>) routeDAO.getAllCities());
            response.sendRedirect("./pages/home.jsp");
        } else {
            response.sendRedirect("login.jsp?error=1");
        }


    }
}

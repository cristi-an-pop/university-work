package org.example.lab8.servlet;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.example.lab8.model.City;

import java.io.IOException;
import java.util.LinkedList;

@WebServlet(name = "finalizeRouteServlet", value = "/finalize-route-servlet")
public class FinalizeRouteServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession(false);
        if(session == null || session.getAttribute("user") == null) {
            try {
                response.sendRedirect("login.jsp");
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }

        LinkedList<City> route = (LinkedList<City>) session.getAttribute("route");
        request.setAttribute("route", route);
        request.getRequestDispatcher("./pages/routeSummary.jsp").forward(request, response);
    }
}

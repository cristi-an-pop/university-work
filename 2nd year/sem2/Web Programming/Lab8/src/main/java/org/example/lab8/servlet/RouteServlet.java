package org.example.lab8.servlet;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.example.lab8.dao.RouteDAO;
import org.example.lab8.model.City;

import java.io.IOException;
import java.util.LinkedList;
import java.util.List;

@WebServlet(name = "routeServlet", value = "/route-servlet")
public class RouteServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession(false);
        if (session == null || session.getAttribute("user") == null) {
            try {
                response.sendRedirect("./pages/login.jsp");
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
            return;
        }

        String cityIdParam = request.getParameter("cityId");
        int cityId = cityIdParam == null ? 1 : Integer.parseInt(cityIdParam);
        RouteDAO routeDAO = new RouteDAO();
        City currentCity = routeDAO.getCityById(cityId);
        if (currentCity == null) {
            try {
                response.sendRedirect("./pages/home.jsp");
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
            return;
        }

        LinkedList<City> route = (LinkedList<City>) session.getAttribute("route");
        if (route == null) {
            route = new LinkedList<>();
        }
        route.add(currentCity);
        int cityIndex = route.indexOf(currentCity);
        request.setAttribute("cityIndex", cityIndex + 1);
        String index = request.getParameter("index");
        if (index != null) {
            int newIndex = Integer.parseInt(index);
            request.setAttribute("cityIndex", newIndex + 1);
            while (route.size() > newIndex + 1) {
                route.removeLast();
            }
        }
        session.setAttribute("route", route);

        List<City> neighbouringCities = routeDAO.getNeighbouringCities(cityId);
        request.setAttribute("currentCity", currentCity);
        request.setAttribute("neighbouringCities", neighbouringCities);
        try {
            request.getRequestDispatcher("./pages/route.jsp").forward(request, response);
        } catch (ServletException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}

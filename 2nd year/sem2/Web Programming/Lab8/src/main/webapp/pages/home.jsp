<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="jakarta.servlet.http.*,jakarta.servlet.*,java.util.*" %>
<%@ page import="org.example.lab8.model.User" %>
<%@ page import="org.example.lab8.model.City" %>
<%
    HttpSession httpSession = request.getSession(false);
    if (httpSession == null || httpSession.getAttribute("user") == null) {
        response.sendRedirect("login.jsp");
        return;
    }
    List<City> cities = (List<City>) httpSession.getAttribute("cities");
    httpSession.setAttribute("route", null);
%>
<html>
<head>
    <title>Home</title>
</head>
<body>
    <h2>Welcome, <%= ((User)httpSession.getAttribute("user")).getUsername() %>!</h2>
    <h3>Select Starting City:</h3>
    <ul>
        <% for (City city : cities) { %>
        <li><a href="../route-servlet?cityId=<%= city.getId() %>"><%= city.getName() %></a></li>
        <% } %>
    </ul>
    <a href="../logout-servlet">Logout</a>
</body>
</html>

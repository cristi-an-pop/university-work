<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="jakarta.servlet.http.*,java.util.*" %>
<%@ page import="org.example.lab8.model.City" %>
<%@ page import="java.util.List" %>
<%
    HttpSession httpSession = request.getSession(false);
    if (httpSession == null || httpSession.getAttribute("user") == null) {
        response.sendRedirect("./login.jsp");
        return;
    }
    City currentCity = (City) request.getAttribute("currentCity");
    List<City> neighbouringCities = (List<City>) request.getAttribute("neighbouringCities");
%>
<!DOCTYPE html>
<html>
<head>
    <title>Route Selection</title>
</head>
<body>
<h2>Current City: <%= currentCity.getName() %></h2>
<h3>Neighbouring Cities:</h3>
<ul>
    <% for (City city : neighbouringCities) { %>
    <li><a href="./route-servlet?cityId=<%= city.getId() %>"><%= city.getName() %></a></li>
    <% } %>
</ul>
<a href="./finalize-route-servlet">Finalize Route</a>
</body>
</html>


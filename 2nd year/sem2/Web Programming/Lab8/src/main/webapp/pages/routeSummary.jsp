<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="org.example.lab8.model.City" %>
<%@ page import="java.util.LinkedList" %>
<%
    HttpSession httpSession = request.getSession(false);
    if (httpSession == null || httpSession.getAttribute("user") == null) {
        response.sendRedirect("./login.jsp");
        return;
    }
    LinkedList<City> route = (LinkedList<City>) request.getAttribute("route");
%>
<!DOCTYPE html>
<html>
<head>
    <title>Route Summary</title>
</head>
<body>
<h2>Final Route:</h2>
<% for (int i = 0; i < route.size(); i++) { %>
<li><a href="./route-servlet?cityId=<%= route.get(i).getId() %>&index=<%= i %>"><%= route.get(i).getName() %></a></li>
<% } %>
<a href="./pages/home.jsp">Change Route</a>
</body>
</html>
package org.example.lab8.dao;

import org.example.lab8.model.City;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class RouteDAO {
    private static final String JDBC_URL = "jdbc:mysql://localhost:3306/web";
    private static final String JDBC_USER = "root";
    private static final String JDBC_PASS = "";

    public List<City> getAllCities() {
        loadDriver();
        String query = "SELECT * FROM cities";
        List<City> cities = new ArrayList<>();
        try (Connection conn = DriverManager.getConnection(JDBC_URL, JDBC_USER, JDBC_PASS);
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(query)) {
            while (rs.next()) {
                cities.add(new City(rs.getInt("id"), rs.getString("name")));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return cities;
    }

    public City getCityById(int id) {
        loadDriver();
        String query = "SELECT * FROM cities WHERE id = ?";
        try (Connection conn = DriverManager.getConnection(JDBC_URL, JDBC_USER, JDBC_PASS);
             PreparedStatement stmt = conn.prepareStatement(query)) {
            stmt.setInt(1, id);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                return new City(rs.getInt("id"), rs.getString("name"));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        System.out.println("City not found");
        return null;
    }

    public List<City> getNeighbouringCities(int cityId) {
        loadDriver();
        String query = "SELECT c.* FROM routes r JOIN cities c ON r.neighbor_id = c.id WHERE r.city_id = ?";
        List<City> neighboringCities = new ArrayList<>();
        try (Connection conn = DriverManager.getConnection(JDBC_URL, JDBC_USER, JDBC_PASS);
             PreparedStatement stmt = conn.prepareStatement(query)) {
            stmt.setInt(1, cityId);
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                neighboringCities.add(new City(rs.getInt("id"), rs.getString("name")));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return neighboringCities;
    }

    private void loadDriver() {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
}

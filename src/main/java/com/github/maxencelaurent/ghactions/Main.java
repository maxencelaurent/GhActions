/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.github.maxencelaurent.ghactions;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

/**
 *
 * @author maxence
 */
public class Main {

    private static final String DB_CON = "jdbc:postgresql://localhost:5432/test";

    private static final String USER = "user";

    private static final String PASSWORD = "1234";

    public static void createTable() {
        String sql = "CREATE TABLE Books (id int, title varchar(255));";

        try (Connection connection = DriverManager.getConnection(DB_CON, USER, PASSWORD);
            Statement st = connection.createStatement()) {
            st.execute(sql);
        } catch (SQLException ex) {
            System.out.println("Error..." + ex);
        }
    }
}

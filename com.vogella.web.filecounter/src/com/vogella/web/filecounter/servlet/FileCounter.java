package com.vogella.web.filecounter.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.vogella.web.filecounter.dao.FileDao;

/**
 * Servlet implementation class FileCounter
 */
@WebServlet("/session")
public class FileCounter extends HttpServlet {
    private static final long serialVersionUID = 1L;
    // int count;
    private FileDao dao;

    @Override
    protected void doGet(HttpServletRequest request,
            HttpServletResponse response) throws ServletException, IOException {
        // Set a cookie for the user, so that the counter does not increate
        // every time the user press refresh
        HttpSession session = request.getSession();
        // Set the session valid for 5 secs
        // session.setMaxInactiveInterval(5);
        response.setContentType("text/plain");
        PrintWriter out = response.getWriter();
        
        
        String userAgent=request.getHeader("user-agent");
        
        
        Integer countKeeper =  (Integer) session.getAttribute("count");
        
        if(countKeeper == null) {
        	countKeeper = 0;
        }
        countKeeper++;
        session.setAttribute("count", countKeeper);
        System.out.println(countKeeper);
        
        String id = session.getId();
        System.out.println(id);
        
        out.println("This site has been accessed " + countKeeper + " times...");
        out.println("Browser name is: " + userAgent);
        
        
    }
    

}
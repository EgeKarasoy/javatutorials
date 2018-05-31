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

    int countChrome=0;
    int countFirefox=0;
    int countDifferent=0;
    int count=0;
    private FileDao dao;

    @Override
    protected void doGet(HttpServletRequest request,
            HttpServletResponse response) throws ServletException, IOException {
        // Set a cookie for the user, so that the counter does not increate
        // every time the user press refresh
        HttpSession session = request.getSession(true);
        // Set the session valid for 5 secs
        session.setMaxInactiveInterval(5);
        response.setContentType("text/plain");
        PrintWriter out = response.getWriter();
   
        
        String userAgent=request.getHeader("user-agent");
        String browserName = "";
        if(userAgent.contains("Chrome")){ //checking if Chrome
              String substring=userAgent.substring(userAgent.indexOf("Chrome")).split(" ")[0];
              browserName=substring.split("/")[0];
              session.setAttribute("countChrome", countChrome);
              if (session.isNew()) {
                  countChrome++;
              }
              out.println("This site has been accessed " + countChrome + " times...");
              out.println("Browser name is: " + browserName);
        }else if(userAgent.contains("Firefox")){  //Checking if Firefox
              String substring=userAgent.substring(userAgent.indexOf("Firefox")).split(" ")[0];
              browserName=substring.split("/")[0];
              session.setAttribute("countFirefox", countFirefox);
              if (session.isNew()) {
                  countFirefox++;
              }
              out.println("This site has been accessed " + countFirefox + " times...");
              out.println("Browser name is: " + browserName);
        }else{  //Checking if others
            session.setAttribute("countDifferent", countDifferent);
            if (session.isNew()) {
                countFirefox++;
            }
            out.println("This site has been accessed " + countDifferent + " times...");
            out.println("Browser name is: " + browserName);
      }

    }


    @Override
    public void init() throws ServletException {
        dao = new FileDao();
        try {
            count = dao.getCount();
        } catch (Exception e) {
            getServletContext().log("An exception occurred in FileCounter", e);
            throw new ServletException("An exception occurred in FileCounter"
                    + e.getMessage());
        }
    }

    public void destroy() {
        super.destroy();
        try {
            dao.save(count);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
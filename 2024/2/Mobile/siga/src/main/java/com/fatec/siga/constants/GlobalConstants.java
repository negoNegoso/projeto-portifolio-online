package com.fatec.siga.constants;

public class GlobalConstants {


    //Roots
    public static final String ALL = "/**";
    public static final String AUTHENTICATION_ROOT = "/authentication";
    public static final String ADMIN_ROOT = "/admin/users";
    public static final String FORGOTTEN_PASSWORD = "/users/forgotten-password";


    //URLs
    public static final String LOGIN_URL = AUTHENTICATION_ROOT + "/login";
    public static final String LOGIN_ERROR_URL = AUTHENTICATION_ROOT + "/login-error";
    public static final String REGISTER_URL = AUTHENTICATION_ROOT + "/register";
    public static final String LOGOUT_URL = "/logout";
    public static final String INDEX_URL = "/";
    public static final String INDEX_URL_USER = "/home";



    //Templates
    public static final String LOGIN_TEMPLATE = "authentication-login";
    public static final String REGISTER_TEMPLATE = "authentication-register";

    //Validation attributes
    public static final String BINDING_MODEL = "bindingModel";
    public static final String BINDING_RESULT = "org.springframework.validation.BindingResult." + BINDING_MODEL;
    public static final String ERROR = "error";

    //Page title
    public static final String REGISTER_TITLE = "Register";
    public static final String LOGIN_TITLE = "Login";


    //Messages
    public static final String GROUP_CREATED = "%s %s class exists.";

    //Error messages
    public static final String GROUP_EXISTS = "%s %s class has been added.";

    //Email messages
    public static final String EMAIL_BODY =
                    "Е-school%n%n" +
                    "-----------------------------------------------%n" +
                    "Username:%n" +
                    "%s%n" +
                    "-----------------------------------------------%n" +
                    "Password:%n" +
                    "%s%n" +
                    "-----------------------------------------------%n";
    public static final String ACCOUNT_CREATED_SUBJECT = "Account created";
    public static final String FORGOTTEN_PASSWORD_SUBJECT = "forgotten password";
}

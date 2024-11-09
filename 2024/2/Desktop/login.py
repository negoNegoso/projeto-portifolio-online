import tkinter as tk
from tkinter import *
from tkinter import messagebox

from backend.database.db_connection import DBConnection
from backend.services.app_service import AppService

class Login(tk.Toplevel):
    def __init__(self, master):
        super().__init__(master)
        self.title("Login")
        self.geometry("1280x720")
        self.configure(bg="white")
        self.controller = master
        
        # Conteúdo do Frame 1
        # Carregando as imagens da pasta 
        self.img = PhotoImage(file="imgs/background.png")
        self.img3 = PhotoImage(file="imgs/Ellipse 1.png")

        # Criando os Labels que irão conter uma imagem
        self.lbl_back_f1 = Label(self,image = self.img,background="white")
        self.lbl_elp = Label(self.lbl_back_f1,image = self.img3,background="#303A98")

        # Criando as Labels que serão exibidas na tela
        self.lbl_text1 = Label(self.lbl_back_f1,text = "Login", background="#2990B3", foreground="white", font="Montserrat 35 bold")
        self.lbl_text2 = Label(self.lbl_back_f1,text = "Insira as informações para acessar o sistema:", background="#2985AF", foreground="white", font="Montserrat 20")
        self.lbl_text3 = Label(self.lbl_back_f1,text = "Usuário:", background="#2A77AB", foreground="white", font="Montserrat 15 bold")
        self.txt_textBox1 = Entry(self.lbl_back_f1,font = "Montserrat 15")
        self.lbl_text4 = Label(self.lbl_back_f1,text = "Senha:", background="#2D5EA3", foreground="white", font="Montserrat 15 bold")
        self.txt_textBox2 = Entry(self.lbl_back_f1,font = "Montserrat 15")
        self.btn_log = Button(self.lbl_back_f1,text = "Entrar", font="Montserrat 15 bold", foreground="#331C8F", command=self.processaLogin)

        # Salvando e posicionado os labes dentro do Frame
        self.lbl_back_f1.pack()
        self.lbl_elp.place(x=870, y=514)
        self.lbl_text1.place(x=130, y=90)
        self.lbl_text2.place(x=130, y=180)
        self.lbl_text3.place(x=130, y=235)
        self.txt_textBox1.place(x=135, y=285, width=555, height=50)
        self.lbl_text4.place(x=130, y=370)
        self.txt_textBox2.place(x=135, y=420, width=555, height=50)
        self.btn_log.place(x=135, y=550, width=555, height=50)

#    def msg_log(self):
#     messagebox.showinfo("Login", "Login Realizado com Sucesso!")
#        self.destroy()

    def processaLogin(self):
        username = self.txt_textBox1.get()
        password = self.txt_textBox2.get()
        
        login_user = self.controller.app_service.login(username, password)

        if login_user:
            messagebox.showinfo("Login", "Login Realizado com Sucesso!")
            self.destroy()
            self.controller.criar_menu()
        else:
            messagebox.showinfo("Login", "Erro no login!")
          
        # self.destroy()    

        

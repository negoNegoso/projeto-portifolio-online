import tkinter as tk
from tkinter import *
from tkinter import messagebox
from tkinter import font
from tkinter import ttk

class Usuario(tk.Toplevel):
    def __init__(self, aplicacao): # aplicacao é a classe Aplicacao
        super().__init__(aplicacao)
        self.title("Cadastro")
        self.geometry("1280x820")
        self.resizable(False, False)
        self.controller = aplicacao
        
        self.img = PhotoImage(file="imgs/tela_cadastro(2).png")  
        self.label1 = Label(self, image=self.img, bg="#26A7B9")
        self.label1.place(x=0, y=0)

        custom_font = font.Font(family="Helvetica", size=20, weight="bold")

        user_type = StringVar(value="Aluno")
        Radiobutton(self, text="SECRETARIA", variable=user_type, value="Secretaria", font=custom_font).place(x=195, y=163)
        Radiobutton(self, text="PROFESSOR", variable=user_type, value="Professor", font=custom_font).place(x=405, y=163)
        Radiobutton(self, text="ADMINISTRADOR   ", variable=user_type, value="Administrador", font=custom_font).place(x=195, y=195)
        Radiobutton(self, text="ALUNO", variable=user_type, value="Aluno", font=custom_font).place(x=479, y=195)

        entry_nome = Entry(self, font=custom_font, width=27)
        entry_nome.place(x=195, y=261)

        entry_senha = Entry(self, font=custom_font, width=27, show="*")  
        entry_senha.place(x=195, y=327)

        entry_confsenha = Entry(self, font=custom_font, width=27, show="*")  
        entry_confsenha.place(x=195, y=395)

        entry_datanasc = Entry(self, font=custom_font, width=12)
        entry_datanasc.place(x=195, y=464)

        entry_cpf = Entry(self, font=custom_font, width=27)
        entry_cpf.place(x=195, y=533)

        combo_sexo = ttk.Combobox(self, values=["Masculino", "Feminino", "Outro"], font=custom_font, width=11)
        combo_sexo.place(x=413, y=464)

        btn_enviar = Button(self, text="Próximo", font=custom_font, bg="white", command=self.enviarCadastro, width=17)
        btn_enviar.place(x=815, y=630)

        btn_voltar = Button(self, text="Voltar", font=custom_font, bg="white", command=self.voltar, width=17)
        btn_voltar.place(x=170, y=630)

    def enviarCadastro(self):
#        nome = entry_nome.get()
#        senha = entry_senha.get()
#        confsenha = entry_confsenha.get()
#        datanasc = entry_datanasc.get()
#        cpf = entry_cpf.get()
#        sexo = combo_sexo.get()  
#        tipo_usuario = user_type.get()  
#
#        if nome and senha and confsenha and datanasc and cpf and sexo:
#            if senha == confsenha:  
#                messagebox.showinfo("Cadastro", f"Cadastro realizado com sucesso!\nNome: {nome}\nSenha: {senha}\nData de Nascimento: {datanasc}\nCPF: {cpf}\nSexo: {sexo}\nTipo de Usuário: {tipo_usuario}")
#                self.destroy()
#            else:
#                messagebox.showwarning("Erro", "As senhas não coincidem.")
#        else:
        messagebox.showwarning("Cadastro", "Por favor, preencha todos os campos.")
        self.destroy()
        
    def voltar(self):
        self.destroy()
        self.controller.criar_menu()


#        lbl_nome = tk.Label(self, text="Nome:")
#        lbl_nome.pack(pady=10)
        
#        self.entry_nome = tk.Entry(self)
#        self.entry_nome.pack(pady=10)

#        btn_salvar = tk.Button(self, text="Salvar", command=self.salvar)
#        btn_salvar.pack(pady=10)

#        btn_voltar = tk.Button(self, text="Voltar", command=self.destroy)
#        btn_voltar.pack(pady=10)

#    def salvar(self):
#        nome = self.entry_nome.get()
#        messagebox.showinfo("Info", f"Salvo: {nome}")
#        self.entry_nome.delete(0, tk.END)

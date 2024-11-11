import tkinter as tk
import requests
from tkinter import messagebox
import subprocess
# Função para criar gradiente dentro de um canvas
def create_gradient(canvas, width, height, color1, color2):
    for i in range(height):
        r = int(color1[0] + (color2[0] - color1[0]) * i / height)
        g = int(color1[1] + (color2[1] - color1[1]) * i / height)
        b = int(color1[2] + (color2[2] - color1[2]) * i / height)
        color = f'#{r:02x}{g:02x}{b:02x}'
        canvas.create_line(0, i, width, i, fill=color)

# Função para desenhar um retângulo com cantos arredondados
def rounded_rectangle(canvas, x1, y1, x2, y2, radius=15, **kwargs):
    points = [
        (x1 + radius, y1), (x2 - radius, y1),
        (x2, y1, x2, y1 + radius), (x2, y2 - radius),
        (x2, y2, x2 - radius, y2), (x1 + radius, y2),
        (x1, y2, x1, y2 - radius), (x1, y1 + radius),
        (x1, y1, x1 + radius, y1)
    ]
    return canvas.create_polygon(points, **kwargs, smooth=True)

# Função para buscar disciplinas da API
def fetch_disciplinas():
    try:
        response = requests.get("http://localhost:8080/disciplinas")
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Erro ao buscar disciplinas: {e}")
        return []

# Função para abrir a tela de cadastro
def create_discipline():
    try:
        subprocess.Popen(["python", "cadastro.py"])  
        disciplina.destroy()
    except Exception as e:
        messagebox.showerror("Erro", f"Erro ao abrir a tela de cadastro: {str(e)}")

# Função para abrir a tela de edição de disciplina
def edit_discipline(disciplina_id):
    try:
        subprocess.Popen(["python", "alterar.py", str(disciplina_id)])  
    except Exception as e:
        messagebox.showerror("Erro", f"Erro ao abrir a tela de edição: {str(e)}")

# Cores RGB para o gradiente
color1 = (0, 142, 179)   # Azul
color2 = (60, 33, 121)   # Roxo

# Variáveis de controle de página
current_page = 0
items_per_page = 8
buttons = []  # Inicializa a lista de botões aqui

def main():
    global disciplina
    global current_page
    global disciplinas

    disciplinas = fetch_disciplinas()
    
    # Janela principal
    disciplina = tk.Tk()
    disciplina.title("Disciplinas Cadastradas")
    disciplina.geometry("1280x720")
    disciplina.configure(bg="white")

    # Título da janela
    title = tk.Label(disciplina, text="Disciplinas Cadastradas", font=("Montserrat", 24), bg="white", fg="#004080")
    title.pack(pady=20)

    # Botão de adicionar nova disciplina
    add_btn = tk.Button(
        disciplina, 
        text="Adicionar +", 
        font=("Montserrat", 16), 
        bg="white", 
        fg="#004080", 
        borderwidth=2, 
        relief="solid", 
        highlightbackground="white",
        command=create_discipline
    )
    add_btn.place(x=1110, y=20)  
    # Canvas para aplicar o gradiente no menu
    canvas = tk.Canvas(disciplina, width=1280, height=720, highlightthickness=0)
    canvas.pack(pady=20)

    # Criar o gradiente dentro do canvas
    create_gradient(canvas, 1280, 720, color1, color2)

    # Desenhar o retângulo do menu com cantos arredondados
    rounded_rectangle(canvas, 10, 10, 1270, 710, radius=50, fill="", outline="", width=0)

    # Adicionar linha vertical no meio
    canvas.create_line(640, 0, 640, 810, fill="white", width=1)

    # Função para mostrar disciplinas de acordo com a página atual
    def show_disciplines():
        canvas.delete("discipline")  # Limpa disciplinas anteriores

        # Remove todos os botões antigos
        for btn in buttons:
            btn.destroy()
        buttons.clear()  # Limpa a lista de botões

        # Determinar o índice inicial e final das disciplinas a serem exibidas
        start_index = current_page * items_per_page
        end_index = start_index + items_per_page
        current_disciplinas = disciplinas[start_index:end_index]

        # Verifica se há disciplinas para mostrar
        if not current_disciplinas:
            return

        # Criar as disciplinas dentro do canvas
        for i, disciplina in enumerate(current_disciplinas):
            nome_disciplina = disciplina.get("nomeDisciplina", "Nome Indisponível")
            disciplina_id = disciplina.get("disciplinaID")

            if not disciplina_id:
                print("Erro: disciplinaID não encontrado para uma das disciplinas.")
                continue

            # Ajustar a posição com base no índice
            if i < 4:  # Primeira coluna
                x = 100
                y = 100 + i * 110
            else:  # Segunda coluna
                x = 740
                y = 100 + (i - 4) * 110

            # Caixa de texto com o nome da disciplina
            rounded_rectangle(canvas, x, y, x + 450, y + 70, radius=15, fill="", outline="white", width=1, tags="discipline")
            canvas.create_text(x + 20, y + 35, text=nome_disciplina, font=("Montserrat", 16), fill="white", anchor="w", tags="discipline")

            # Adicionar botões de edição e exclusão com o ID correto
            icon_x = x + 430
            icon_y = y + 35
            edit_btn = tk.Button(canvas, text="✏️", font=("Montserrat", 14), fg="black", bg="#ffffff", bd=1,
                                command=lambda disciplina_id=disciplina_id: edit_discipline(disciplina_id), width=2, height=1)
            canvas.create_window(icon_x, icon_y - 15, window=edit_btn)
            buttons.append(edit_btn)  # Adiciona o botão à lista para rastreamento

            delete_btn = tk.Button(canvas, text="🗑️", font=("Montserrat", 14), fg="black", bg="#ffffff", bd=1,
                                command=lambda disciplina_id=disciplina_id: delete_discipline(disciplina_id), width=2, height=1)
            canvas.create_window(icon_x, icon_y + 15, window=delete_btn)
            buttons.append(delete_btn)  # Adiciona o botão à lista para rastreamento

    
    # Função para excluir uma disciplina
    def delete_discipline(disciplina_id):
        try:
            response = requests.delete(f"http://localhost:8080?disciplinaID={disciplina_id}")
            if response.status_code == 200:
                messagebox.showinfo("Sucesso", "Disciplina excluída com sucesso!")
                global disciplinas
                disciplinas = fetch_disciplinas()
                show_disciplines()
            else:
                messagebox.showerror("Erro", f"Não foi possível excluir a disciplina: {response.text}")
        except requests.exceptions.RequestException as e:
            messagebox.showerror("Erro de Conexão", f"Erro ao tentar excluir a disciplina: {str(e)}")
    # Funções de navegação
    def previous_page():
        global current_page
        if current_page > 0:
            current_page -= 1
            show_disciplines()

    def next_page():
        global current_page
        if (current_page + 1) * items_per_page < len(disciplinas):
            current_page += 1
            show_disciplines()

    # Botões de seta lateral para navegação
    arrow_left = tk.Button(disciplina, text="⬅️", font=("Montserrat", 18), bg="white", fg="#004080", command=previous_page)
    arrow_left.place(x=335, y=120)

    arrow_right = tk.Button(disciplina, text="➡️", font=("Montserrat", 18), bg="white", fg="#004080", command=next_page)
    arrow_right.place(x=800, y=120)

    show_disciplines()  # Chama a função para exibir disciplinas ao iniciar

    disciplina.mainloop()

# Executar a aplicação
if __name__ == "__main__":
    main()

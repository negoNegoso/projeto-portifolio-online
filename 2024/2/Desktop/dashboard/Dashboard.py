from tkinter import *
from PIL import Image, ImageTk
import matplotlib.pyplot as plt
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg
from backend_frequencia import (
    buscar_dados_alunos, 
    processar_dados_alunos, 
    total_media_das_notas,
    media_faltas_em_relacao_ao_total
)
from processar_dsm3 import (
    buscar_dados_dsm, 
    processar_dados_dsm_3, 
    total_alunos as total_alunos_dsm3,
    calcular_porcentagem_frequencia
)
from processar_dsm5 import total_alunos as total_alunos_dsm5
from processar_dsm4 import buscar_dados_dsm4, processar_dados_dsm4, total_alunos as total_alunos_dsm4
import os

# Criar a janela principal
janela = Tk()
janela.title("Dashboard")

# Define o tamanho da tela
janela.geometry("1200x650")

# Define para habilitar o redimensionamento da tela
janela.resizable(True, True)

# Define o tamanho máximo e mínimo da tela
janela.maxsize(width=1920, height=1080)
janela.minsize(width=570, height=420)

# No início do código, após criar a janela, adicione:
estado_botao = StringVar(value="DSM 5")  # Inicializa com "DSM 5" selecionado

# Criando a figura do gráfico com três subplots (dois à esquerda e direita, um central)
figura = plt.Figure(figsize=(13, 5), dpi=60)
ax1 = figura.add_subplot(121)  # Gráfico de barras à esquerda
ax2 = figura.add_subplot(122)  # Gráfico de barras à direita
ax3 = figura.add_subplot(111)  # Gráfico central para Unidade Y

# Ajustar a posição do gráfico central (mais estreito)
ax3.set_position([0.3, 0.1, 0.4, 0.8])  # [left, bottom, width, height]
ax3.set_visible(False)  # Inicialmente invisível

# Função para desenhar os gráficos
def desenhar_graficos(media_api=None, faltas_api=None, modo="unidade_x"):
    try:
        if modo == "unidade_x":
            # Tornar visível apenas os gráficos da DSM 5
            ax1.set_visible(True)
            ax2.set_visible(True)
            ax3.set_visible(False)
            
            # Limpar gráficos anteriores
            ax1.clear()
            ax2.clear()
            
            # Buscar dados de ambos os bancos
            try:
                # Dados DSM 5
                url_dsm5 = "http://ec2-35-173-235-57.compute-1.amazonaws.com:8080/api/students/"
                dados_dsm5 = buscar_dados_alunos(url_dsm5)
                df_dsm5 = processar_dados_alunos(dados_dsm5)
                total_dsm5 = total_alunos_dsm5(df_dsm5)
                # Calcular frequência do DSM 5 usando os dados do DataFrame
                frequencia_dsm5 = (df_dsm5["Total Presentes"].sum() / df_dsm5["Total de Aulas"].sum()) * 100 if df_dsm5["Total de Aulas"].sum() > 0 else 0
                
                # Dados DSM 3
                url_dsm3 = "10.67.57.64:5000/dsm-3/consumo"
                dados_dsm3 = buscar_dados_dsm(url_dsm3)
                df_dsm3 = processar_dados_dsm_3(dados_dsm3)
                total_dsm3 = total_alunos_dsm3(df_dsm3)
                frequencia_dsm3 = calcular_porcentagem_frequencia(df_dsm3)
            except Exception as e:
                print(f"Erro ao buscar dados: {e}")
                total_dsm3 = 0
                total_dsm5 = 0
                frequencia_dsm3 = 0
                frequencia_dsm5 = 0
            
            # Dados para o gráfico de total de alunos (esquerda)
            instituicoes = ['DSM 3', 'DSM 5']
            totais = [total_dsm3, total_dsm5]
            bar_colors = ['#26A7B9', '#331C8F']
            
            # Desenha o gráfico de barras de total de alunos
            bars = ax1.bar(instituicoes, totais, color=bar_colors)
            ax1.set_ylabel('Quantidade de Alunos')
            ax1.set_title('Total de Alunos por Instituição')
            
            # Adicionar rótulos nas barras
            for bar in bars:
                height = bar.get_height()
                ax1.text(bar.get_x() + bar.get_width()/2., height,
                        f'{int(height)}', ha='center', va='bottom')

            # Dados para o gráfico de barras de frequência (direita)
            fruits = ['DSM 3', 'DSM 5']
            freq_counts = [frequencia_dsm3, frequencia_dsm5]  # Usando a frequência calculada do DSM 5
            
            # Desenha o gráfico de barras de frequência
            bars2 = ax2.bar(fruits, freq_counts, color=bar_colors)
            ax2.set_ylabel('Frequência (%)')
            ax2.set_title('Média de Frequência')
            ax2.set_ylim(0, 100)
            
            # Adicionar rótulos nas barras de frequência
            for bar in bars2:
                height = bar.get_height()
                ax2.text(bar.get_x() + bar.get_width()/2., height,
                        f'{height:.1f}%', ha='center', va='bottom')

        else:  # modo == "unidade_y"
            # Tornar visível apenas o gráfico da DSM 4
            ax1.set_visible(False)
            ax2.set_visible(False)
            ax3.set_visible(True)
            
            # Limpar gráfico anterior
            ax3.clear()
            
            try:
                # Buscar dados do DSM 3
                url_dsm3 = "10.67.57.64:5000/dsm-3/consumo"
                dados_dsm3 = buscar_dados_dsm(url_dsm3)
                df_dsm3 = processar_dados_dsm_3(dados_dsm3)
                total_dsm3 = total_alunos_dsm3(df_dsm3)

                # Buscar dados do DSM 4
                url_dsm4 = "10.67.57.66:3000/dsm-4/consumo"
                dados_dsm4 = buscar_dados_dsm4(url_dsm4)
                df_dsm4 = processar_dados_dsm4(dados_dsm4)
                total_dsm4 = total_alunos_dsm4(df_dsm4)
            except Exception as e:
                print(f"Erro ao buscar dados: {e}")
                total_dsm3 = 0
                total_dsm4 = 0
            
            # Dados para o gráfico da DSM 4 vs DSM 3
            labels = ['DSM 3', 'DSM 4']
            values = [total_dsm3, total_dsm4]  # Agora usando o valor real do DSM 4
            colors = ['#26A7B9', '#331C8F']
            
            # Desenha o gráfico de barras
            bars3 = ax3.bar(labels, values, color=colors)
            ax3.set_ylabel('Quantidade de Alunos')
            ax3.set_title('Total de Alunos por Instituição')
            
            # Adicionar rótulos nas barras
            for bar in bars3:
                height = bar.get_height()
                ax3.text(bar.get_x() + bar.get_width()/2., height,
                        f'{int(height)}', ha='center', va='bottom')
        
        # Atualizar o canvas
        canva.draw()
        
    except Exception as e:
        print(f"Erro ao atualizar gráfico: {e}")

# Desenha os gráficos
desenhar_graficos()


# Lista para manter as referências das imagens
imagens_carregadas = []

# Função para criar um gradiente vertical no canvas
def gradiente_vertical(canvas, cor_inicial, cor_final, largura, altura):
    r1, g1, b1 = janela.winfo_rgb(cor_inicial)
    r2, g2, b2 = janela.winfo_rgb(cor_final)
    r_ratio = (r2 - r1) / altura
    g_ratio = (g2 - g1) / altura
    b_ratio = (b2 - b1) / altura

    for i in range(altura):
        r = int(r1 + (r_ratio * i))
        g = int(g1 + (g_ratio * i))
        b = int(b1 + (b_ratio * i))
        cor = f'#{r:04x}{g:04x}{b:04x}'
        canvas.create_line(0, i, largura, i, fill=cor)


# Função para criar um botão com borda colorida e efeito hover
def criar_botao_com_borda(parent, text, x, y):
    # Frame para a borda
    frame_borda = Frame(parent, bg="#26A7B9", bd=2)  # Cor da borda e espessura
    frame_borda.place(x=x, y=y)

    # Funções para alterar a cor do botão ao passar o mouse
    def on_enter(event):
        if estado_botao.get() != text:  # Muda a cor se não estiver ativo
            btn['bg'] = "#26A7B9"  # Cor de fundo ao passar o mouse
            btn['fg'] = "#FFFFFF"   # Cor do texto ao passar o mouse

    def on_leave(event):
        if estado_botao.get() != text:  # Restaura a cor se não estiver ativo
            btn['bg'] = "#FFFFFF"  # Cor de fundo padrão
            btn['fg'] = "#26A7B9"  # Cor do texto padrão
        else:  # Se estiver ativo, mantém a cor ativa
            btn['bg'] = "#26A7B9"  # Cor de fundo ativo
            btn['fg'] = "#FFFFFF"   # Cor do texto ativo

    # Função para ativar o botão e alterar as cores
    def ativar_botao():
        estado_botao.set(text)
        for b in (btn_unidadeX, btn_unidadeY):
            if b['text'] == text:
                b['bg'] = "#26A7B9"
                b['fg'] = "#FFFFFF"
            else:
                b['bg'] = "#FFFFFF"
                b['fg'] = "#26A7B9"
        
        if text == "DSM 5":
            try:
                url = "http://ec2-35-173-235-57.compute-1.amazonaws.com:8080/api/students/"
                dados = buscar_dados_alunos(url)
                df = processar_dados_alunos(dados)
                media_total = total_media_das_notas(df)
                faltas = media_faltas_em_relacao_ao_total(df)
                print(f"Faltas da API: {faltas}%")
                desenhar_graficos(media_total, faltas, modo="unidade_x")
            except Exception as e:
                print(f"Erro ao buscar dados da API: {e}")
        else:
            desenhar_graficos(modo="unidade_y")

    # Botão dentro do Frame
    btn = Button(
        frame_borda,
        text=text,
        bg="#26A7B9" if text == "DSM 5" else "#FFFFFF",  # Cor inicial baseada no texto
        fg="#FFFFFF" if text == "DSM 5" else "#26A7B9",  # Cor do texto baseada no texto
        font="Montserrat 15 bold",
        bd=1,
        command=ativar_botao
    )
    btn.pack(padx=5, pady=5)  # Adiciona um padding interno

    # Bind dos eventos de passar o mouse
    btn.bind("<Enter>", on_enter)
    btn.bind("<Leave>", on_leave)

    return btn  # Retorna o botão para controle posterior

# Função para criar o canvas com imagem de fundo e elementos sobrepostos
def retangulo(canvas, path, x1, y1, x2, y2, text):
    image = Image.open(path)
    image = image.resize((x2 - x1, y2 - y1), Image.LANCZOS)
    image_tk = ImageTk.PhotoImage(image)
    canvas.create_image(x1, y1, anchor="nw", image=image_tk)
    canvas.create_text((x1 + x2) // 2, (y1 + y2) // 2, text=text, fill="white")
    imagens_carregadas.append(image_tk)

    # Elementos que irão sobre o canvas
    global btn_unidadeX, btn_unidadeY
    btn_unidadeX = criar_botao_com_borda(canvas, "DSM 5", 400, 125) 
    btn_unidadeY = criar_botao_com_borda(canvas, "DSM 4", 680, 125)
    
    # Ativar o botão DSM 5 inicialmente
    btn_unidadeX.configure(bg="#26A7B9", fg="#FFFFFF")

# Função para carregar uma imagem simples (Logo)
def carregar_imagem(caminho, largura, altura):
    imagem = Image.open(caminho)  
    imagem_redimensionada = imagem.resize((largura, altura), Image.LANCZOS)
    imagem_tk = ImageTk.PhotoImage(imagem_redimensionada) 
    imagens_carregadas.append(imagem_tk)  
    return imagem_tk  

# Criar o canvas para desenhar a imagem de fundo
canvas_fundo = Canvas(janela, width=1200, height=650)
canvas_fundo.place(x=0, y=0)  # Usando place para posicionar o fundo

# Aplicar o gradiente no canvas
gradiente_vertical(canvas_fundo, "#26A7B9", "#331C8F", 1200, 650)

# Caminhos das imagens
script_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(script_dir)  # Get parent directory

# Update image paths to use parent directory
retangulo_Superior = os.path.join(parent_dir, "imgs", "retangulo_superior_branco.png")
retangulo_Inferior = os.path.join(parent_dir, "imgs", "retangulo_inferior_branco.png")
logo_path = os.path.join(parent_dir, "imgs", "logo.png")
botao_voltar_path = os.path.join(parent_dir, "imgs", "botao_voltar_branco.png")
botao_seguir_path = os.path.join(parent_dir, "imgs", "botao_seguir_branco.png")

# Definir a fonte
font = ("Monster Alternates", 30, "bold") 

def inicializar_elementos():
    # Criar o título
    canvas_fundo.create_text(600, 20, text="Dashboard", fill="#FFFFFF", font=font, anchor="n")

    # Criar o botão voltar 
    botao_voltar_img = carregar_imagem(botao_voltar_path, 30, 30)
    botao_voltar = canvas_fundo.create_image(20, 20, anchor='nw', image=botao_voltar_img)
    canvas_fundo.tag_bind(botao_voltar, '<Button-1>', lambda event: print("Botão voltar clicado!"))
    canvas_fundo.tag_bind(botao_voltar, '<Enter>', lambda event: canvas_fundo.config(cursor="hand2"))
    canvas_fundo.tag_bind(botao_voltar, '<Leave>', lambda event: canvas_fundo.config(cursor=""))

    # Criar o botão seguir
    botao_seguir_img = carregar_imagem(botao_seguir_path, 30, 30)
    botao_seguir = canvas_fundo.create_image(60, 20, anchor='nw', image=botao_seguir_img)
    canvas_fundo.tag_bind(botao_seguir, '<Button-1>', lambda event: print("Botão seguir clicado!"))
    canvas_fundo.tag_bind(botao_seguir, '<Enter>', lambda event: canvas_fundo.config(cursor="hand2"))
    canvas_fundo.tag_bind(botao_seguir, '<Leave>', lambda event: canvas_fundo.config(cursor=""))

    # Inicializar os elementos
    retangulo(canvas_fundo, retangulo_Superior, 200, 100, 1000, 200, "Imagem Superior")
    retangulo(canvas_fundo, retangulo_Inferior, 200, 195, 1000, 550, "Imagem Inferior")

    # Logo
    logo_img = carregar_imagem(logo_path, 180, 80)  
    canvas_fundo.create_image(520, 560, anchor='nw', image=logo_img)

# Inicializar os elementos na tela
inicializar_elementos()

# Criar o canvas para os gráficos e posicioná-lo sobre o retângulo inferior
canva = FigureCanvasTkAgg(figura, janela)
canva.get_tk_widget().place(x=210, y=220)  # Coloca os gráficos sobre o retângulo inferior

# Iniciar o loop principal da interface
janela.mainloop()

class Produto{
    constructor(){
        this.id = 1;
        this.arrayProdutos = [];
        this.editId = null;
    }
    salvar(){
        let produto = this.lerDados();
        if(this.validaCampos(produto)){
            if(this.editId == null){
                this.adicionar(produto);
            }else {
                this.atualizar(this.editId,produto);
            }
        }
        this.listaTabela();
        this.limpaCampos();     
    }

    lerDados(){
        let produto = {};

        produto.produto = document.getElementById("produto").value;
        produto.preco = document.getElementById("preco").value;
        produto.id = this.id;
        
        return produto;
    }

    validaCampos(produto){
        let msg = '';

        if(produto.produto == ''){
            msg += 'Informe o nome do produto \n';
        }
        if(produto.preco == '') {
            msg += 'Informe o preço do produto \n';
        }

        if (msg !== ''){
            alert(msg);
            return false;
        }
        return true;
    }

    listaTabela(){
        let tbody = document.getElementById("tbody");
        tbody.innerText = '';

        for (let i = 0; i < this.arrayProdutos.length; i++){
            let tr = tbody.insertRow();

            let td_id = tr.insertCell();
            let td_produto = tr.insertCell();
            let td_preco = tr.insertCell();
            let td_acoes = tr.insertCell();

            td_id.innerText = this.arrayProdutos[i].id;
            td_produto.innerText= this.arrayProdutos[i].produto;
            td_preco.innerText = this.arrayProdutos[i].preco;

            td_id.classList.add('center');

            let imgEdit = document.createElement('img');
            imgEdit.src = 'img/edit.png';
            imgEdit.setAttribute("onclick","produto.preparaEdit("+ JSON.stringify(this.arrayProdutos[i]) +")")

            let imgDelete = document.createElement('img');
            imgDelete.src = 'img/delete.png';  
            imgDelete.setAttribute("onclick","produto.deletar("+ this.arrayProdutos[i].id +")");          
            
            td_acoes.appendChild(imgEdit);
            td_acoes.appendChild(imgDelete);
        }
    }

    adicionar(produto){
        produto.preco = parseFloat(produto.preco);
        this.arrayProdutos.push(produto); // Adiciona o array produtos no final do array
        this.id ++;
    }
    cancelar(){
        this.limpaCampos();
    }
ss
    limpaCampos(){
        document.getElementById('produto').value = '';
        document.getElementById('preco').value = '';       
        this.editId = null;       
        document.getElementById("btn1").innerText = "Salvar";         
    }

    deletar(id){
        if(confirm("Deseja realmente deletar esse Id: "+ id)){
            for (let i=0; i < this.arrayProdutos.length; i++){
                if(this.arrayProdutos[i].id == id){
                    this.arrayProdutos.splice(i,1) // passa o indice e a qtde de itens a ser deletado
                    let tbody = document.getElementById("tbody");
                    tbody.deleteRow(i);
                    console.log(this.arrayProdutos);
                }
            }
        }
    }
    
    preparaEdit(dados){
        document.getElementById("produto").value = dados.produto;
        document.getElementById("preco").value = dados.preco;
        document.getElementById("btn1").innerText = "Atualizar";
        this.editId = dados.id;
    }

    atualizar(id,produto){
        for(let i = 0; i < this.arrayProdutos.length; i++){
            if(this.arrayProdutos[i].id == id){
                this.arrayProdutos[i].produto = produto.produto;
                this.arrayProdutos[i].preco = produto.preco;
            }
        }
    }
}
var produto = new Produto();
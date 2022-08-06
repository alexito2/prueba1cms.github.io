const dropArea = document.querySelector(".drop-area");
const dragText = dropArea.querySelector("h2");
const button = dropArea.querySelector("button");
const input = dropArea.querySelector("#input-file");
let files;

button.addEventListener("click", (e) => {
    input.click();
});

input.addEventListener("change", (e) =>{
    files= this.files;
    dropArea.classList.add("active");
    showFiles(files);
    dropArea.classList.remove("active");
});

// funcionalidad del drop para que se active al arrastrar archivo
dropArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropArea.classList.add("active");
    dragText.textContent = "Suelta para agregar";
});

dropArea.addEventListener("dragleave", (e) => {
    e.preventDefault();
    dropArea.classList.remove("active");
    dragText.textContent ="Arrastra archivo";
});

dropArea.addEventListener("drop", (e) => {
    e.preventDefault();
    //se manda a llamar los archivos
    files = e.dataTransfer.files;
    showFiles(files);
    dropArea.classList.remove("active");
    dragText.textContent ="Arrastra archivo";
});


//funcion de arrastrar alrchivos y que funcione correctamente
function showFiles(files){
    if(files.length = undefined){
        processFile(files);
    }
    else{
        for(const file of files){
            processFile(file);//
        }
    }
}

function processFile(file){//
    const docType = file.type;
    const validExtensions = ["3D Object/glb", "3D Object/usdz", "image/png"];

    if(validExtensions.includes(docType)){
        //Archivo valido
        const fileReader = new FileReader();
        const id = `file-${Math.random().toString(32).substring(7)}`;

        fileReader.addEventListener("load", (e) =>{
            const fileUrl = fileReader.result;
            const image = `
            <div id="${id}" class="file-container"> 
                <img src="${fileUrl}" alt="${file.name}" width="50px">
                <div class="status">
                    <span>${file.name}</span>
                    <span class="status-text"> 
                        Loading.....
                    </span>
                </div>
            </div> 
            `;

            const html = document.querySelector('#preview').innerHTML;
            document.querySelector('#preview').innerHTML = image + html;

        });

        fileReader.readDataUrl(file);//
        uploadFile(file, id);


    }
    else{
        //No es un archivo valido
        alert("Archivo no valido ");
    }
}

function uploadFile(file){

}
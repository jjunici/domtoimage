import React ,{useState} from 'react';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
const Main = () => {
    const [data,setData] = useState("");
    function dataURItoBlob(dataURI) {
        // convert base64 to raw binary data held in a string
        // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
        var byteString = atob(dataURI.split(',')[1]);
      
        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
      
        // write the bytes of the string to an ArrayBuffer
        var ab = new ArrayBuffer(byteString.length);
      
        // create a view into the buffer
        var ia = new Uint8Array(ab);
      
        // set the bytes of the buffer to the correct values
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
      
        // write the ArrayBuffer to a blob, and you're done
        var blob = new Blob([ab], {type: mimeString});
        return blob;
      
      }
    const onConvert = e => {
        const node = document.getElementById("my-node")
        const myCanvas = document.getElementById("myCanvas")
        const ctx = myCanvas.getContext("2d");
        domtoimage.toPng(node)
            .then(function(dataUrl) {
                var img = new Image();
                img.onload =function(){
                    ctx.drawImage(img,0,0,);
                }
                img.src = dataUrl;
                setData(dataUrl)
                
            })
            .catch(function(error) {    
                console.log("error",error);
            })
     
    }
    const getImg = () => {
        //console.log("data",data)
        var blob = dataURItoBlob(data)
        console.log("blobssss",blob)
        saveAs(new Blob([blob], {type: "image/png"}),"myimage.png")
    }

    return(
        <div id="canvas">
            <div id="my-node">
                <div className="mybox">

                </div>
             
            </div>
            <canvas id="myCanvas" height="400" width="400">

            </canvas>
         
           <button onClick={onConvert}>이미지로 변환</button>
           <button onClick={getImg}>이미지 얻기</button>
        </div>
    )
}
export default Main;

import Plant from '@/assets/images/Plant.gif';

class Loading{
    constructor(){}
    getLoading(){
        let div = document.createElement('div');
        div.id = 'loading';
        div.style.cssText = `
            position: fixed;
            left: 0;
            top: 0;
            background: url('${Plant}') center center no-repeat #fff;
            width: 100vw;
            height: 100vh;
            z-index: 1000;
        `
        return div;
    }
    start(){
        let load = this.getLoading();
        document.body.appendChild(load);
    }
    done(){
        Array.from(document.body.querySelectorAll('#loading')).forEach(item=>{
            item.remove();
        })
    }
}
let loading : {
    start():void;
    done():void;
} | null = null;
if(!loading){
    loading = new Loading();
}
export default loading;

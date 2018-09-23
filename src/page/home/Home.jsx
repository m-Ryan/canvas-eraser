import React from 'react';
import styles from './home.scss';
import maskGirl from '../../static/images/girl2.png';
import logo from '../../static/images/simple-logo.png'
export default class Home extends React.PureComponent {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        this.toolRef = React.createRef();
        this.ctx = null;
        this.pageX = 0; //距离屏幕左侧的偏移
        this.pageY = 0; //距离屏幕顶部的偏移
        this.dpi =2;   //dpi
        this.state = {
            isSelected: false, //已选护肤品
            isSelectedOver: false, //护肤品动画结束
            isDrag : false, // 已经点击拖动
        }
    }

    componentDidMount() {
        this.initCanvas();
    }

    async initCanvas() {

        const width = document.body.clientWidth * this.dpi; //获取屏幕的宽度， * dpi 是为了防止图片失真
        const height = width * 774 / 750;   //774是图片的高750是宽，保持图片比例

        //设置canvas
        let canvas = this.canvasRef.current;
        canvas.width = width ;
        canvas.height = height;
        
        //canvas的偏移
        this.pageX = canvas.getBoundingClientRect().left;
        this.pageY = canvas.getBoundingClientRect().top;
  
        const ctx = canvas.getContext('2d');
        //canvas中使用图片
        var pic = new Image();
        pic.src =  maskGirl;
        await new Promise(resolve => pic.onload = () => resolve());
        ctx.drawImage(pic, 0, 0, width, height);


        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.lineWidth = 40 * this.dpi;

        //合成模式
        ctx.globalCompositeOperation = "destination-out";

        this.ctx = ctx;
        window.addEventListener('touchstart', this.tapStart);
        
    }

    tapStart = (e)=> {
        const { isDrag } = this.state;
       
        if(!isDrag) return;
        const pageX = this.pageX;
        const pageY = this.pageY;
        
        
        let startX = e.touches[0].pageX - pageX;
        let startY = e.touches[0].pageY - pageY;

        this.draw(startX, startY);

        const tapMove=(e)=> {
     
            let moveX = e.touches[0].pageX - pageX;
            let moveY = e.touches[0].pageY - pageY;
            this.draw(startX, startY, moveX, moveY);
            startX = moveX;
            startY = moveY;
        }
        const tapEnd=(e)=> {
            window.removeEventListener('touchmove', tapMove);
            window.removeEventListener('touchend', tapEnd);
        }
        window.addEventListener('touchmove', tapMove);
        window.addEventListener('touchend', tapEnd);
    }

    draw(startX, startY, moveX, moveY) {
        const dpi = this.dpi;
        let tool = this.toolRef.current;
        tool.style.left = startX + this.pageX - tool.clientWidth * 0.5 + 'px';
        tool.style.top = startY  + this.pageY  - tool.clientHeight * 0.5 + 'px';
        let ctx = this.ctx;

        if (moveX === undefined) {
            ctx.save();
            ctx.beginPath();
            ctx.arc(startX, startY, 10, 0, 2 * Math.PI);
            ctx.clip();
            ctx.clearRect(0, 0, 10000, 10000); //设置一个足够大的值，确保涵盖整个画布，因为 ctx.clip()，不会影响到裁剪外的区域
            ctx.restore();
        } else {
  
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(startX * dpi + this.pageX, startY *dpi + this.pageY);
            ctx.lineTo(moveX * dpi + this.pageX, moveY * dpi + this.pageY);
            ctx.stroke();
            ctx.fill()
            ctx.clip();
            ctx.clearRect(0, 0, 10000, 10000);
            ctx.restore();
        }
    }

    onDrag=(e)=>{
        if(!this.state.isSelected) return;
        e.persist();
        this.setState({
            isDrag: true
        },()=>{
            let tool = this.toolRef.current;
            tool.style.position = 'fixed';
            tool.style.left = e.pageX - tool.clientWidth * 0.5 + 'px';
            tool.style.top = e.pageY  - tool.clientHeight * 0.5 + 'px';
        })
    }

    onSelect=()=>{
        this.setState({
            isSelected: true
        }, ()=>{
            //化妆品的动画是4s
            setTimeout(()=>{
                this.setState({
                    isSelectedOver: true
                })
            }, 4000)
        })
    }

    render() {
        const { isDrag, isSelected, isSelectedOver } = this.state;
        const scaleClass = isSelectedOver && !isDrag?styles.scale: '';
        const jumpClass = isSelected? '':styles.jump;
        const moveClass = isSelected? styles.move:'';
        return (
            <div className={styles.container}>
                <header><img src= {logo} alt=""/></header>
                <section></section>
                <footer>
                    <div className={scaleClass}>
                        <span onTouchStart={this.onDrag} ref={this.toolRef} className={styles.dragActive + ' ' + styles.btn1}>
                        </span>
                    </div>
                    <div>
                        <span onClick={this.onSelect} className={styles.dragActive+' ' +moveClass+ ' '+ styles.btn2}>
                        </span>
                    </div>
                </footer>
                <div className={styles.popup+ ' '+ styles.fade}></div>
                <div className={styles.popup2+ ' '+ jumpClass}></div>
                <canvas ref={this.canvasRef} className={styles.canvas}/>
               
            </div>
        )
    }
}

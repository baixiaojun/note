var colors=['aquamarine ','blue','deeppink','orangered']

var app=new Vue({
    el:'#app',
    data:{
        notes:[
            {id:1,title:'心情杂语',content:'一花一世界，一叶一菩提',top:20,left:10,threm:'aquamarine '},
            // {id:2,title:'心情杂语',content:'vvvv',top:20,left:300,threm:'blue'},
            // {id:3,title:'心情杂语',content:'vvvvvv',top:320,left:10,threm:'deeppink'},
            // {id:4,title:'心情杂语',content:'vvvvv',top:320,left:300,threm:'orangered'}
        ],
        moveEvent:{state:false,index:null,position:{}}
    },
    methods:{
        addNote:function (e) {
            var id=this.notes[this.notes.length - 1];
            var top=e.clientY-100;
            var left=e.clientX-220;
            var note={
                id:id,
                title:'心情杂语',
                content:'',
                top:top,
                left:left,
                threm:colors[Math.floor(Math.random()*colors.length)]
            }
            this.notes.push(note);
            this.save();
        },
        md:function (i,e) {
            this.moveEvent.index=i;
            this.moveEvent.position={
                x:e.offsetX,
                y:e.offsetY
            }
           this.moveEvent.state=true
        },
        mv:function (e) {
            if(this.moveEvent.state){
                var top=e.clientY-90-this.moveEvent.position.y;
                var left=e.clientX-130-this.moveEvent.position.x;
                this.notes[this.moveEvent.index].top=top;
                this.notes[this.moveEvent.index].left=left;
                this.save();
            }
        },
        mu:function () {
            this.moveEvent.state=false
        },
        save: function () {
            localStorage.notes = JSON.stringify(this.notes);
        },

        close:function (i) {
            this.notes.splice(i, 1);
            this.save();
        }
    },
    mounted: function () {

        document.onkeyup = (function (e) {
            if(e && e.keyCode===46){
                if(this.moveEvent.index !=null){
                    this.notes.splice(this.moveEvent.index,1);
                    this.moveEvent.index=this.notes.length ? this.notes.length-1 : null
                }
            }
        }).bind(this);

        if (localStorage.notes) {
            this.notes = JSON.parse(localStorage.notes);
        }
    },

})

// echo "# note" >> README.md
// git init
// git add README.md
// git commit -m "first commit"
// git remote add origin https://github.com/baixiaojun/note.git
//     git push -u origin master
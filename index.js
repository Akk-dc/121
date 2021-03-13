function bindEvent(){
    var menu = document.getElementsByClassName('menu')[0];
    menu.onclick = function(e){
        if(e.target.tagName === 'DD'){
            var active = getSiblings(e.target);
            e.target.classList.add('active');
            for(var i = 0;i < active.length;i ++){
                active[i].classList.remove('active');
            }
          var id = e.target.dataset.id;
          var content = document.getElementById(id);
          content.classList.add('active-content');
          var activeContent = getSiblings(content);
          for(var i = 0;i < activeContent.length;i ++){
            activeContent[i].classList.remove('active-content');
         }
      }
    }
    var student = document.getElementById('student'); 
    student.onclick = function(){
        e.preventDefault();
        var form = document.getElementById('student-add-form');
        var formData = getFormData(form);

        if(formData.status == 'fail'){
            alert(formData.msg);
        }else{
            // var data = Object.assign({
            //     appkey:AKK121_1614926621259
            // },formData.data); 
            // var dataStr = "";
            // for(var prop in data){
            //    if(data.hasOwnProperty(prop)){
            //        dataStr += prop + '=' + data[prop] +'&';
            //    }
            // }
            // ajax('get','http://open.duyiedu.com/api/student/addStudent',dataStr,function(res){
            //     console.log(res);
            //     if(res.status == 'success'){
            //         alert('添加成功');
            //         var studentListMenu = document.querySelector('.menu dd[data-id=student-list]')
            //         studentListMenu.click();
            //     }else{
            //         alertlert(res.msg);
            //     }
            // },true);

            transferData("/api/student/addStudent",formData.data,function(data){
                alert('添加成功');
                var studentListMenu = document.querySelector('.menu dd[data-id=student-list]')
                studentListMenu.click();
            })
        }
    }
}

function getSiblings(node){
    var elements = Array.from(node.parentNode.children);
    return elements.filter(function(item){
        return item !=node;
    })
}

function getFormData(form){
   var name = form.name.value;
   var sex = form.sex.value;
   var email = form.email.value;
   var sNo = form.sNo.value;
   var birth = form.birth.value;
   var phone = form.phone.value;
   var address = form.address.value;

   if(!name || !sex || !email || !sNo || !birth || !phone || !address){
         return{
             status:'fail',
             msg:'信息填写不完全，请校验后提交',
         }
   }
   var sexReg = /^[01]$/;
   if(!sexReg.test(sex)){
       return{
           status:'fail',
           msg:'性别只能选择男或女'
       }
   }
   var emailReg = /[\w\.]+@[\w-]+\(com|cn)$/
   if(!emailReg.test(emailReg)){
       return{
           status:'fail',
           msg:'邮箱格式不正确'
       }
   }
   if(birth < 1940 || birth > 2010){
       return{
           status:'fail',
           msg:'学生出生年份请填写1940-2010之间的数字'
       }
   }
   var phoneReg = /1[3-9]\d{9}/;
   if(!phoneReg.test(phone)){
       return{
           status:'fail',
           msg:'手机号格式不正确'
       }
   }
   var sNoReg = /^\d{4,16}$/;
   if(!sNoReg.test(sNo)){
       return{
           status:'fail',
           msg:'学号必须是4-16位有效数字'
       }
   }
   return{
       status:'success', 
       data:{
           name,
           sex,
           email,
           birth,
           phone,
           sNo,
           address
       }
   }
}

function transferData(url,data,success){
    var dataStr = "";
    if(typeof data === 'object'){
    data = Object.assign({
        appkey:AKK121_1614926621259
    },data); 
    for(var prop in data){
       if(data.hasOwnProperty(prop)){
           dataStr += prop + '=' + data[prop] +'&';
       }
    }
}else{
    dataStr =data +'&AKK121_1614926621259';
}
ajax('get','http://open.duyiedu.com',dataStr,function(res){
                if(res.status == 'success'){
                   success(res.data);  
                }else{
                    alertlert(res.msg);
                }
            },true); 
}

bindEvent();

$(function() {
    console.log(123);
    const { form } = layui
    form.verify({
        pass: [
            /^\w{6,12}$/,
            '密码只能6~12位'
        ],
        confirmPass: function(val) {
            if (val !== $('#pass').val()) {
                return '两次密码输入不一致'
            }
        },




    })
    $('.layui-form').submit(function(e) {
        e.preventDefault();
        axios.post('/my/updatepwd', $(this).serialize()).then(res => {
            console.log(res);
            if (res.status != 0) {
                return layer.msg('修改失败')

            }
            layer.msg('修改成功')
        })
    })

















})
$(function() {

    $('.link a').click(function() { // 去注册、登录切换
        $('.layui-form').toggle();
    });
    const { form, layer } = layui;
    form.verify({ // 密码验证
        pass: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        samepass: function(value) {
            if (value !== $('#pass').val()) {
                return '两次密码输入不一致'
            }
        }
    });
    // 注册账号
    $('.reg-form').submit(function(e) {
        e.preventDefault()
        axios.post('/api/reguser', $(this).serialize())
            .then(res => {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('注册失败')
                }
                layer.msg('注册成功')
                $('.reg-form a').click()


            })

    })
    $('.login-form').submit(function(e) {
        e.preventDefault();
        axios.post('/api/login', $(this).serialize())
            .then(res => {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                }
                localStorage.setItem('token', res.token);
                location.href = './index.html'
            })
    })




















})
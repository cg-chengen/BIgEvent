$(function() {
    const { form } = layui
    // 定义弹出层索引
    let index;
    // 从服务器获取文章数据,并渲染
    getCateList();

    function getCateList() {
        axios.get('/my/article/cates').then(res => {
            console.log(res);
            //验证失败
            if (res.status !== 0) {
                return layer.msg('获取失败!')
            };
            const htmlStr = template('tpl', res);
            // console.log(htmlStr);
            $('tbody').html(htmlStr);
        });
    }
    // 添加按钮点击事件
    $('.add_btn').click(function() {
        index = layer.open({
            type: 1,
            title: '添加文章分类',
            content: $('.add_form_container').html(), //这里content是一个普通的String
            area: ['500px', '290px'],
        });
    });
    // 添加按钮表单提交事件
    $(document).on('submit', '.add_form', function(e) {
        e.preventDefault();
        axios.post('/my/article/addcates', $(this).serialize()).then(res => {
            console.log(res);
            if (res.status !== 0) {
                return layer.msg('获取失败!')
            };
            // 关闭弹出层
            layer.close(index);
            // 重新渲染
            getCateList();
        });
    });
    //编辑按钮
    $(document).on('click', '.edit_btn', function() {
        console.log(123);
        index = layer.open({
            type: 1,
            title: '修改文章分类',
            content: $('.edit_form_container').html(), //这里content是一个普通的String
            area: ['500px', '290px'],
        });
        // 获取自定义变量id
        const id = $(this).data('id');
        // 使用axios的get获取服务器id数据
        axios.get(`/my/article/cates/${id}`).then(res => {
            console.log(res);
            if (res.status !== 0) {
                return layer.msg('获取失败!')
            };
            form.val("edit_form", res.data);
        })
    })
    $(document).on('submit', '.edit_form', function(e) {
        e.preventDefault();
        axios.post('/my/article/updatecate', $(this).serialize()).then(res => {
            console.log(res);
            if (res.status !== 0) {
                return layer.msg('获取失败!')
            };
            // 关闭弹出层
            layer.close(index);
            // 重新渲染
            getCateList();
        })
    })

    // 删除功能
    $(document).on('click', '.del_btn', function(e) {
        e.preventDefault();
        const id = $(this).data('id')
        axios.get(`/my/article/deletecate/${id}`).then(res => {
            console.log(res);
            if (res.status !== 0) {
                return layer.msg('获取失败!')
            };
            getCateList();
        })
    })








})
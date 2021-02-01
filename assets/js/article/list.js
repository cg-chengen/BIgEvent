$(function() {
    const { form, laypage } = layui;
    getCateList()

    function getCateList() {
        // 从服务器获取数据
        axios.get('/my/article/cates').then(res => {
            console.log(res);
            if (res.status !== 0) {
                return layer.msg('获取失败!')
            };
            res.data.forEach(item => {
                $('.cate_sel').append(`
                <option value="${item.Id}">${item.name}</option>
                `);
            });
            form.render('select');
        })
    }
    const q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    }
    renderTable()

    function renderTable() {
        axios.get('/my/article/list', {
            params: q
        }).then(res => {
            console.log(res);
            if (res.status !== 0) {
                return layer.msg('获取失败!')
            }
            const htmlStr = template('tpl', res);
            $('tbody').html(htmlStr)
            renderPage(res.total)
        })
    }

    function renderPage(total) {
        laypage.render({
            elem: 'test1', //注意，这里的 test1 是 ID，不用加 # 号
            count: total, //数据总数，从服务端得到
            limit: q.pagesize,
            limits: [2, 3, 4, 5],
            curr: q.pagenum,
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            jump: function(obj, first) {
                // 每次切换分页,向服务请求数据来更新表单
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                if (!first) {
                    renderTable();
                }

            }
        });
    }
    $('.layui-form').submit(function(e) {

        e.preventDefault();
        const cate_id = $('.cate_sel').val();
        const state = $('.state').val();
        q.cate_id = cate_id;
        q.state = state;

        renderTable()
    })
    $(document).on('click', '.del_btn', function() {
        const id = $(this).data('id');
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
            //发送请求至服务器,删除
            axios.get(`/my/article/delete/${id}`).then(res => {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('删除失败!')
                };
                layer.msg('删除成功!');
                // 判断页面是否等于1且删除的是否为最后一个
                if ($('.del_btn').length == 1 && q.pagenum != 1) {
                    q.pagenum--
                }
                // 重新渲染
                renderTable()
            });
            // 关闭弹窗
            layer.close(index);
        });
    })







})
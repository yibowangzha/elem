import request from './request'

// get请求方式
export function gets(url, data) {
    return request.get(url, {
        params: data
    })
}

// post请求方式
export function posts(url, data) {
    return request.post(url, data)
}

// 当前城市请求地址接口
export function ajaxCity(type) {
    return gets(`/v1/cities?type=${type}`)
}

// 获取验证码
export function ajaxCode() {
    return posts(`/v1/captchas`)
}


// 登录
export function ajaxLogin(data) {
    return posts(`/v2/login`, data)
}

export function ajaxlist(type) {
    return gets(`/v1/cities/${type}`)
}
// 搜索接口
export function ajaxsousuo(id, keyword) {
    return gets(`/v1/pois?type=search&city_id=${id}&keyword=${keyword}`)
}

export function ajaxdenglu(id) {
    return gets(`/v1/user?user_id=${id}`)
}

export function ajaxjingwei(g) {
    return gets(`/v2/pois/${g}`)
}


export function ajaxjingwei2(g) {
    return gets(`/v2/index_entry?${g}&group_type=1&flags[]=F`)
}

export function ajaxjingwei3() {
    return gets(`/shopping/restaurants?latitude=32.007733&longitude=118.764667&offset=0&limit=20&extras[]=activities&keyword=&restaurant_category_id=&restaurant_category_ids[]=&order_by=&delivery_mode[]=`)
}
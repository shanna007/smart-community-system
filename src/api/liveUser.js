import http from '@/utils/http'
//新增
export async function addApi(parm){
    return await http.post("/api/liveUser",parm)
}
//获取角色列表
export async function getRoleListApi(){
    return await http.get("/api/role/getList",null)
}
//居民列表
export async function getListApi(parm){
    console.log(parm)
    return await http.get("/api/liveUser/list",parm)
}
//根据id查询用户
export async function getUserByIdApi(parm){
    return await http.get("/api/liveUser/getUserById",parm)
}
//编辑
export async function editApi(parm){
    return await http.put("/api/liveUser",parm)
}
//删除
export async function deleteUserApi(parm){
    return await http.delete("/api/liveUser",parm)
}
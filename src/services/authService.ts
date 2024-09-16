import apiService from "@/services/apiService";
// import cs from '@/services/commonService'
import type AuthRole from "@/interfaces/admin/AuthRole";
import type AuthUser from "@/interfaces/admin/AuthUser";

/* auth role */
const getAuthRoles = async (): Promise<AuthRole[]> => {
  return (await apiService.get("auth/roles")) as AuthRole[];
};

const getAuthRoleById = async (id: number) => {
  return (await apiService.get(`auth/role/${id}`)) as AuthRole;
};

const postAuthRole = async (postData: AuthRole) => {
  return await apiService.post("auth/role", postData);
};

const getAuthUserRole = async (): Promise<AuthUser> => {
  return await apiService.get("auth/user_role");
};

const getAuthUserRoleByAuthId = async (auth_id: number) => {
  return await apiService.get(`auth/${auth_id}/auth_user_role`);
};

const getAuthUserRoleById = async (id: number) => {
  return await apiService.getHttpRequest(`auth/user_role/${id}`);
};

const postAuthUserRole = async (postData: AuthUser) => {
  return await apiService.postHttpRequest("auth/user_role", formData);
};

/* auth permission */
const getAuthPermissions = async () => {
  return await apiService.get("auth/permissions");
};

const getAuthPermissionById = async (id) => {
  return await apiService.get(`auth/permission/${id}`);
};

const postAuthPermission = async (postData) => {
  return await apiService.post("auth/permission", formData);
};

/* auth users */
const getAuthUsers = async () => {
  return (await apiService.get("auth/users")) as AuthUser[];
};

const getAuthUserById = async (id: number) => {
  return (await apiService.get(`auth/user/${id}`)) as AuthUser;
};

const postAuthUser = async (postData: AuthUser) => {
  return await apiService.post("auth/user", postData);
};

// const getAuthRolePermission = async () => {
//     let resp = await apiService.get('auth/role_permission');
//     return cs.requestResponse( resp);
// },

// async getAuthRolePermissionByAuthId( auth_id) {
//     let resp = await apiService.get('auth/'+auth_id+'role_permission');
//     return cs.requestResponse( resp);
// },

// async getAuthRolePermissionById( id) {
//     let resp = await apiService.get('auth/role_permission/'+id);
//     return cs.requestResponse( resp);
// },

// async postAuthRolePermission( postData) {
//     let formData = cs.getFormData( postData)
//     let resp = await api.postHttpRequest('auth/role_permission', formData);
//     return cs.requestResponse( resp);
// },

const authService = {
  getAuthRoles: getAuthRoles,
  getAuthRoleById: getAuthRoleById,
  postAuthRole: postAuthRole,
  getAuthUserRole: getAuthUserRole,
  getAuthUserRoleByAuthId: getAuthUserRoleByAuthId,
  getAuthUserRoleById: getAuthUserRoleById,
  postAuthUserRole: postAuthUserRole,
  getAuthPermissions: getAuthPermissions,
  getAuthPermissionById: getAuthPermissionById,
  postAuthPermission: postAuthPermission,
  getAuthUsers: getAuthUsers,
  getAuthUserById: getAuthUserById,
  postAuthUser: postAuthUser,
};

export default authService;

import { supabase } from '../db/index.js'

const USER_SCHEMA = "users"

// 创建用户
export const createUser = async (userData) => {
    const { data, error } = await supabase
        .schema('yulin')
        .from(USER_SCHEMA) // 替换为你的用户表名
        .insert(userData)
        .select();
    
    if (error) {
        console.error('Error creating user:', error);
        return null;
    }
    return data;
};

// 获取用户
export const getUserById = async (userId) => {
    const { data, error } = await supabase
        .schema('yulin')
        .from(USER_SCHEMA)
        .select('*')
        .eq('userid', userId)
        .single(); // 获取单个用户

    if (error) {
        console.error('Error fetching user:', error);
        return null;
    }
    return data;
};

// 获取用户
export const getUserByOpenId = async (openId) => {
    const { data, error } = await supabase
        .schema('yulin')
        .from(USER_SCHEMA)
        .select('*')
        .eq('openid', openId)
        .single(); // 获取单个用户

    if (error) {
        console.error('Error fetching user:', error);
        return null;
    }
    return data;
};

// 更新用户
export const updateUser = async (userId, updates) => {

    const { error } = await supabase
        .schema('yulin')
        .from(USER_SCHEMA)
        .update(updates)
        .eq('userid', userId);

    if (error) {
        console.error('Error updating user:', error);
        return null;
    }
    return userId;
};

// 删除用户
export const deleteUser = async (userId) => {
    await supabase
        .schema('yulin')
        .from(USER_SCHEMA)
        .delete()
        .eq('userid', userId);

    return userId;
};
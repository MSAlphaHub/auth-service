declare namespace Types {
  // user
  interface IUser {
    id: string; // UUID
    email: string;
    user_name: string;
    first_name?: string;
    last_name?: string;
    status?: string;
    date_of_birth?: Date;
    phone?: string;
    last_login_date?: Date;
    is_deleted: boolean;
    created_at: Date;
    updated_at: Date;
  }

  // user_auth_method
  interface IUserAuthMethod {
    id: string; // UUID
    user_id: string; // UUID
    auth_method: string;
    identifier: string;
    auth_data: string;
    create_by?: string;
    created_at: Date;
    update_by?: string;
    updated_at: Date;
  }

  // user_refresh_tokens
  interface IUserRefreshToken {
    id: number; // INT (Auto Increment)
    user_id: string; // UUID
    token: string;
    expiry_timestamp: Date;
    status: string; // e.g. 'ACTIVE', 'INACTIVE'
    created_at: Date;
  }

  // roles
  interface IRole {
    id: string; // UUID
    name?: string;
    is_disable: boolean;
    is_deleted: boolean;
    create_by?: string;
    created_at: Date;
    update_by?: string;
    updated_at: Date;
  }

  // resources
  interface IResource {
    id: string; // UUID
    name?: string;
    key?: string;
    description?: string;
    is_deleted: boolean;
    create_by?: string;
    created_at: Date;
    update_by?: string;
    updated_at: Date;
  }

  // permissions
  interface IPermission {
    id: string; // UUID
    resource_id: string; // UUID
    name?: string;
    key?: string;
    description?: string;
    is_deleted: boolean;
    create_by?: string;
    created_at: Date;
    update_by?: string;
    updated_at: Date;
  }

  // role_permissions
  interface IRolePermission {
    role_id: string; // UUID
    permission_id: string; // UUID
    is_deleted: boolean;
    create_by?: string;
    created_at: Date;
    update_by?: string;
    updated_at: Date;
  }
}

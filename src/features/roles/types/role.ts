export type RoleDefinition = {
  key: 'ADMIN' | 'MANAGER' | 'STAFF' | 'USER';
  label: string;
  description: string;
  permissions: string[];
  userCount: number;
};

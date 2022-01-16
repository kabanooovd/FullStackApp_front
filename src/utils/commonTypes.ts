export type RoleTypes = "USER" | "ADMIN";

export type TokenTypes = {
	userName: string;
	role: RoleTypes;
	iat: number;
	exp: number;
};

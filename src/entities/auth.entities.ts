export default interface AuthEntities {
    tokens: {
      access: {
        token: string;
        expires: number;
      };
      refresh: {
        token: string;
        expires: number;
      }
    },
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
    }
}
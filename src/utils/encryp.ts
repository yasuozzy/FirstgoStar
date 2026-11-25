import JSEncrypt from 'jsencrypt';

class RSAEncrypt {
  // 定义私有属性及类型
  private encryptor: JSEncrypt;
  private publicKey: string;

  constructor() {
    this.encryptor = new JSEncrypt();
    // 设置公钥（实际使用时替换为后端提供的公钥）
    this.publicKey = `MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAi8cwZz4ieOTYRK1cK40zUJdFEGQ4o1YglavC5UbymvMlR5Ar7JBFSmx5fR/9T0uIAaks7wcmRXr9iRaRHpkNAT3eR9gtQaNhFinK4Rj3cfNEnxMK1mm8zo4wQy5KYT6RGA4wdnVboInY/R+koibM9zxvdqimv3trOYWcD7EBlM7IDlzqflKuRZFq7Ai2C0wrt8/JWCupyDlwqEjbmye4b/f0Hfqcy/0UIX1urZxyIRxoCUenvxtN+I+GGzFISlsAZQRhx+6mlSuFJR8E9rCoXgBnfspMhQ+J94i988CEDsW89Uq0Lbq7fpxbFtxxfS8m32K4ur9EfD+XQYSTA4+weQIDAQAB`;
    this.encryptor.setPublicKey(this.publicKey);
  }

  /**
   * RSA加密方法
   * @param data 需要加密的数据，支持对象、字符串、数字等
   * @returns 加密后的字符串，失败返回 null
   */
  public encrypt(data: unknown): string | null {
    try {
      let dataStr: string;
      
      // 严谨的类型判断，处理 object、null、undefined 等情况
      if (typeof data === 'object' && data !== null) {
        dataStr = JSON.stringify(data);
      } else if (data === undefined || data === null) {
        console.warn('RSA加密警告: 传入的数据为空');
        dataStr = String(data); 
      } else {
        dataStr = String(data);
      }

      // jsencrypt 加密失败时（如文本过长）会返回 false，而不是抛出异常
      const encrypted = this.encryptor.encrypt(dataStr);
      
      if (encrypted === false) {
        console.error('RSA加密失败: 结果为 false，请检查数据长度是否超过密钥限制');
        return null;
      }
      
      return encrypted;
    } catch (error) {
      console.error('RSA加密异常:', error);
      return null;
    }
  }

  /**
   * 更新公钥
   * @param publicKey 新的公钥字符串
   */
  public setPublicKey(publicKey: string): void {
    this.publicKey = publicKey;
    this.encryptor.setPublicKey(publicKey);
  }
}

// 创建单例实例并导出
const rsaEncrypt = new RSAEncrypt();
export default rsaEncrypt;

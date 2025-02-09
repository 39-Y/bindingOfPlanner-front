export default class Util{
  static makeUniqueKey()  {
    const randomTime = Date.now() + Math.floor(Math.random() *  1000000000000);
    return randomTime.toString(36) + Math.random().toString(36).substring(2, 5);
  }

}

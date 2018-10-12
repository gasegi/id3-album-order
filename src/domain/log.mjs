class LogUtil {
  static log() {
    console.log.apply(undefined, arguments);
  }
}

export default LogUtil;
class APIException extends Error {
  constructor({ status, message, data }) {
    let tempMsg = message;
    if (!tempMsg && data && data.message) {
      tempMsg = data.message;
    }
    super(tempMsg);
    this.status = status;
    this.message = JSON.stringify({ status, message: tempMsg });
    this.customMessage = { status, message: tempMsg };
  }
}

export default APIException;

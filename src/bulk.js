const Writable = require('stream').Writable;

// The writable stream that will send the parsed lines to the API
class Bulk extends Writable {
  constructor(client, dashboard) {
    super({ objectMode: true });
    this.client = client;
    this.dashboard = dashboard;
  }

  _write(lines, encoding, callback) {
    this.client.data.send(
      {
        params: { did: this.dashboard },
        data: { data: lines },
      },
      callback
    );
  }
}

module.exports = Bulk;

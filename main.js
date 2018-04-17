const async = require('async');
const readStream = require('fs').createReadStream;
const resolve = require('path').resolve;
const parse = require('csv-parse');
const matlo = require('matlo');

const Chunker = require('./src/chunker');
const Bulk = require('./src/bulk');

const config = require('./config');
const metadata = require('./data/metadata');

const state = {
  path: resolve(__dirname, config.data.file),
  parsed: 0,
};

async.waterfall(
  [
    // Get the client
    cb => matlo.clientFromToken({ token: config.matlo.token }, cb),
    // Create dashboard
    (client, cb) => {
      client.user.createDashboard(
        {
          params: { uid: config.matlo.user },
          data: config.matlo.dashboard,
        },
        (error, response) => {
          if (error) cb(error);
          else cb(null, client, response.result.dashboard.uuid);
        }
      );
    },
    // Set dashboard data format
    (client, dashboard, cb) => {
      client.metadata.set(
        {
          params: { did: dashboard },
          data: { metadata },
        },
        (error, response) => {
          if (error) cb(error);
          else cb(null, client, dashboard);
        }
      );
    },
    // Stream the csv:
    (client, dashboard, cb) => {
      const bulkStream = new Bulk(client, dashboard);

      // Piping the streams
      readStream(state.path)
        .pipe(parse({ delimiter: config.data.delimiter }))
        .pipe(new Chunker(config.stream.bulkSize))
        .pipe(bulkStream);

      bulkStream.once('finish', cb);
    },
  ],
  err => {
    if (err) throw err;
  }
);

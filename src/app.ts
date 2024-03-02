import express, { Application, Request, Response } from 'express';
import mongoose from 'mongoose';

const app: Application = express();

app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/book_review_system', {
    ALPNProtocols: undefined, appName: "", auth: undefined, authMechanism: undefined, authMechanismProperties: undefined, authSource: "", autoCreate: false, autoEncryption: undefined, autoIndex: false, bufferCommands: false, ca: undefined, cert: undefined, checkKeys: false, checkServerIdentity: undefined, ciphers: undefined, compressors: undefined, connectTimeoutMS: 0, crl: undefined, dbName: "", directConnection: false, driverInfo: undefined, ecdhCurve: undefined, enableUtf8Validation: false, family: undefined, forceServerObjectId: false, heartbeatFrequencyMS: 0, hints: undefined, ignoreUndefined: false, journal: false, key: undefined, loadBalanced: false, localAddress: undefined, localPort: undefined, localThresholdMS: 0, lookup: undefined, maxConnecting: 0, maxIdleTimeMS: 0, maxPoolSize: 0, maxStalenessSeconds: 0, minDHSize: undefined, minHeartbeatFrequencyMS: 0, minPoolSize: 0, monitorCommands: false, noDelay: false, pass: "", passphrase: undefined, pfx: undefined, pkFactory: undefined, proxyHost: "", proxyPassword: "", proxyPort: 0, proxyUsername: "", raw: false, readConcern: undefined, readConcernLevel: undefined, readPreference: undefined, readPreferenceTags: [], rejectUnauthorized: undefined, replicaSet: "", retryReads: false, retryWrites: false, secureContext: undefined, secureProtocol: undefined, serializeFunctions: false, serverApi: undefined, serverMonitoringMode: undefined, serverSelectionTimeoutMS: 0, servername: undefined, session: undefined, socketTimeoutMS: 0, srvMaxHosts: 0, srvServiceName: "", ssl: false, tls: false, tlsAllowInvalidCertificates: false, tlsAllowInvalidHostnames: false, tlsCAFile: "", tlsCRLFile: "", tlsCertificateKeyFile: "", tlsCertificateKeyFilePassword: "", tlsInsecure: false, user: "", w: undefined, waitQueueTimeoutMS: 0, writeConcern: undefined, wtimeoutMS: 0, zlibCompressionLevel: undefined,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Define routes
app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

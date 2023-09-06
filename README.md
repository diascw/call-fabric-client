# Call Fabric Client Beta

This repository contains a limited release application using the new Call Fabric SDK from SignalWire.

It currently shows how to do outbound calling only.

It contains two implementations, "full" and "minimal". We recommend starting from the minimal one and using the full application as a reference to add features as needed.

## Getting started

Copy the `env.example` file into `.env` and fill it in with your SignalWire credentials. Set `DEFAULT_DESTINATION` to a resource in your space.

If you do not see the `Resources` tab in your space, please contact Support for enrollment in the beta program.

## Getting a token

The first thing you need to do to use the SDK is requesting a token from SignalWire.

This is an example using CURL:

```
curl --location 'https://YOURSPACE.signalwire.com/api/fabric/subscribers/tokens' \
--form 'reference="foo"' \
--user 'YOURPROJECTKEY:YOURTOKEN'
```

The `reference` field will be used in the future for inbound calling.

In the example application, we use `axios` to retrieve the token.

## Instantiate the client and call the destination

The initialization and calling phases are very similar to the previous version:

```
client = await SignalWire.SignalWire({
  token: _token,
  rootElement: document.getElementById('rootElement'),
})

const call = await client.dial({
  to: document.getElementById('destination').value,
  logLevel: 'debug',
  debug: { logWsTraffic: true },
})

await call.start()
```

For now, please run with debugging on to help with reporting issues.
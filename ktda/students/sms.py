import africastalking


username = "sandbox"    # use 'sandbox' for development in the test environment
api_key = "a6b1cfb74348e6048b1dc93ef97ca32dcc7456381ce874a57e7144c36b00730a"      # use your sandbox app API key for development in the test environment
africastalking.initialize(username, api_key)





# # Use the service synchronously
# response = sms.send("Hello Message!", ["+2547xxxxxx"])
# print(response)

# Or use it asynchronously
def on_finish(error, response):
    if error is not None:
        raise error
    print(response)


def send_sms(message, numbers):
    sms = africastalking.SMS
    sms.send(message, numbers, callback=on_finish)

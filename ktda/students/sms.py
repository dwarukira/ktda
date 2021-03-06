import africastalking


username = "sandbox"    # use 'sandbox' for development in the test environment
api_key = "f74d59649c206c9b9e11083e431a101885f9eeaa533a7dd37452dd3120bb24d9"      # use your sandbox app API key for development in the test environment
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

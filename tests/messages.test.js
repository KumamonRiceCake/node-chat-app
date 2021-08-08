const { generateMessage, generateLocationMessage } = require('../src/utils/messages')

// Test variables
const testUserName = 'exampleUser'
const testText = 'exampleText'
const testURL = 'exampleURL.com'

test('Should generate a new message', () => {
    const message = generateMessage(testUserName, testText)

    expect(message).toMatchObject({
        username: testUserName,
        text: testText
    })
    expect(typeof message.createdAt).toBe('number')
})

test('Should generate a new location message', () => {
    const message = generateLocationMessage(testUserName, testURL)

    expect(message).toMatchObject({
        username: testUserName,
        url: testURL
    })
    expect(typeof message.createdAt).toBe('number')
})
import json
from better_profanity import profanity

# Initialize the profanity filter
profanity.load_censor_words()

# Function to filter words
def filter_words(word_list):
    # Only keep words that are 4 characters or longer and not profane
    filtered_list = [word for word in word_list if len(word) >= 4 and len(word) <= 8 and not profanity.contains_profanity(word)]
    return filtered_list

# Load the JSON file
with open('words.json', 'r') as file:
    data = json.load(file)

# Assuming your list of words is stored under the key 'words'
words = data.get('words', [])

# Apply the filter function
filtered_words = filter_words(words)

# Update the original data
data['words'] = filtered_words

# Save the formatted JSON back to a file
with open('filtered_words.json', 'w') as outfile:
    json.dump(data, outfile, indent=4)

print(f"Filtered words saved to 'filtered_words.json'. Total words: {len(filtered_words)}")

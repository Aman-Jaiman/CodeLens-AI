export const languages = [
  { id: 'cpp', label: 'C++', monaco: 'cpp', extension: 'cpp' },
  { id: 'c', label: 'C', monaco: 'c', extension: 'c' },
  { id: 'java', label: 'Java', monaco: 'java', extension: 'java' },
  { id: 'python', label: 'Python', monaco: 'python', extension: 'py' },
  { id: 'javascript', label: 'JavaScript', monaco: 'javascript', extension: 'js' },
  { id: 'html', label: 'HTML', monaco: 'html', extension: 'html' },
  { id: 'css', label: 'CSS', monaco: 'css', extension: 'css' },
];

export const sampleCode = {
  cpp: `#include <iostream>
#include <vector>

// Calculates sum of vector elements
int calculateSum(const std::vector<int>& numbers) {
    int total = 0;
    for (size_t i = 0; i <= numbers.size(); i++) { // Bug: off-by-one error
        total += numbers[i];
    }
    return total;
}

int main() {
    std::vector<int> nums = {10, 20, 30, 40, 50};
    std::cout << "Sum: " << calculateSum(nums) << std::endl;
    return 0;
}
`,
  c: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void processInput() {
    char buffer[10];
    printf("Enter string: ");
    gets(buffer); // Bug: unsafe function gets() causes buffer overflow
    printf("You entered: %s\\n", buffer);
}

int main() {
    processInput();
    return 0;
}
`,
  java: `import java.util.*;

public class UserService {
    public List<String> getUserNames(List<Map<String, String>> users) {
        List<String> names = new ArrayList<>();
        for (int i = 0; i < users.size(); i++) {
            Map<String, String> user = users.get(i);
            // Bug: Potential NullPointerException if user or name key is null
            names.add(user.get("name").toUpperCase());
        }
        return names;
    }
}
`,
  python: `def process_user_data(user_list):
    results = []
    for user in user_list:
        # Potential Bug: Missing key handling and unhandled Exception
        age = user['age']
        if age > 18:
            results.append(user['name'])
    return results

def calculate_total(prices):
    total = 0
    for price in prices:
        total = total + price
    return total
`,
  javascript: `function fetchUserData(userIds) {
  let results = [];
  // Bug: Async operations inside loop without await
  for (let i = 0; i < userIds.length; i++) {
    fetch("/api/users/" + userIds[i])
      .then((res) => res.json())
      .then((data) => {
        results.push(data);
      });
  }
  return results;
}

function calculateTotal(items) {
  var total = 0;
  for (var i = 0; i < items.length; i++) {
    if (items[i].price != null) {
      total = total + items[i].price * items[i].qty;
    }
  }
  return total;
}
`,
  html: `<!DOCTYPE html>
<html>
<head>
    <title>Sample Web Page</title>
</head>
<body>
    <!-- Bug: Missing alt tag, deprecated tags, inline styles -->
    <center><h1>Welcome to My Website</h1></center>
    <font color="red">Important Notification!</font>
    
    <img src="banner.jpg">
    
    <button onclick="alert('Clicked!')">Click Me</button>
</body>
</html>
`,
  css: `.container {
  width: 1000px;
  /* Bug: Hardcoded widths breaking responsiveness, duplicate rules */
  float: left;
  margin-top: 10px;
}

.button {
  background-color: blue;
  color: white;
  padding: 10px 20px 10px 20px;
  border-radius: 5px;
  font-size: 14px;
  background-color: red; /* Overridden rule */
}
`
};

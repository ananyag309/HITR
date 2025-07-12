# DevFlow Feature Testing Checklist

## ✅ Setup Verification

- [ ] Backend server running on port 5001
- [ ] Frontend server running on port 5173  
- [ ] MongoDB Atlas connected successfully
- [ ] No console errors in browser or terminal

## 🔐 Authentication Features

- [ ] Can sign up new user
- [ ] Can login with credentials
- [ ] Can logout and login again with same credentials
- [ ] Notification bell appears when logged in
- [ ] Avatar and user menu work properly

## 📝 Rich Text Editor Features

### Question Creation
- [ ] Rich text editor loads in question form
- [ ] Bold formatting works
- [ ] Italic formatting works
- [ ] Bullet lists work
- [ ] Numbered lists work
- [ ] Link insertion works
- [ ] Text alignment (left, center, right) works
- [ ] Can submit question with rich text content

### Answer Creation  
- [ ] Rich text editor loads in answer form
- [ ] All formatting options work
- [ ] Can submit answer with rich text content
- [ ] Answer displays formatted content correctly

## 🏷️ Tag System Features

- [ ] Tag selector appears in question form
- [ ] Shows predefined tag suggestions
- [ ] Can type custom tags
- [ ] Can add tags by pressing Enter or comma
- [ ] Can remove tags with X button
- [ ] Enforces 5-tag maximum limit
- [ ] Tags save with question and display properly

## 💬 Answer System Features

### Answer Submission
- [ ] Answer form appears for logged-in users
- [ ] Login prompt appears for guest users
- [ ] Can submit answers with rich text
- [ ] Answer appears immediately after submission
- [ ] Question owner receives notification

### Answer Display
- [ ] Answers display with proper formatting
- [ ] Shows answer author and reputation
- [ ] Shows answer creation date
- [ ] Multiple answers display correctly

## 🗳️ Voting Features

### Question Voting
- [ ] Upvote button works on questions
- [ ] Downvote button works on questions
- [ ] Vote count updates correctly
- [ ] Visual feedback shows user's vote

### Answer Voting  
- [ ] Upvote button works on answers
- [ ] Downvote button works on answers
- [ ] Vote count displays correctly
- [ ] User can change vote (upvote → downvote)
- [ ] Cannot vote on own answers

## ✅ Answer Acceptance

- [ ] Accept button (✓) appears for question owner only
- [ ] Other users don't see accept button
- [ ] Clicking accept marks answer as accepted
- [ ] Accepted answer gets green highlight
- [ ] Only one answer can be accepted
- [ ] Accepted answers sort to top

## 🔔 Notification System

### Notification Bell
- [ ] Bell icon appears in navbar when logged in
- [ ] Shows unread notification count
- [ ] Count updates when new notifications arrive
- [ ] Clicking bell opens notification dropdown

### Notification Dropdown
- [ ] Shows list of recent notifications
- [ ] Displays notification messages correctly
- [ ] Shows time stamps (e.g., "5m ago", "2h ago")
- [ ] Unread notifications highlighted differently
- [ ] "Mark all read" button works

### Notification Triggers
- [ ] Get notification when someone answers your question
- [ ] Get notification when someone votes on your answer
- [ ] Get notification when answer is accepted
- [ ] Don't get notifications for your own actions

### Notification Actions
- [ ] Clicking notification navigates to relevant question
- [ ] Clicking notification marks it as read
- [ ] Individual "mark as read" works
- [ ] "Mark all as read" clears all notifications

## 🎨 UI/UX Features

### Visual Design
- [ ] Consistent purple/pink gradient theme
- [ ] Smooth animations and transitions
- [ ] Responsive design works on different screen sizes
- [ ] Loading states show during API calls
- [ ] Error messages display clearly

### Navigation
- [ ] All navbar links work correctly
- [ ] Back button works on question detail page
- [ ] Breadcrumb navigation clear
- [ ] URLs update correctly during navigation

## 📊 Data Persistence

- [ ] Questions save with all formatting preserved
- [ ] Answers save with rich text formatting
- [ ] Tags save and display correctly
- [ ] Vote counts persist after page refresh
- [ ] User sessions maintain across browser refresh
- [ ] Notifications persist across sessions

## 🔍 Search and Filtering

- [ ] Questions display on main questions page
- [ ] Search functionality works (if implemented)
- [ ] Tag filtering works
- [ ] Sort options work (newest, votes, etc.)

## 📱 Cross-Browser Testing

- [ ] Works in Chrome
- [ ] Works in Firefox  
- [ ] Works in Safari
- [ ] Works in Edge
- [ ] Mobile responsive design

## 🚨 Error Handling

- [ ] Graceful handling of network errors
- [ ] Proper error messages for invalid inputs
- [ ] Fallback states for missing data
- [ ] No unhandled promise rejections
- [ ] No 404 errors for valid routes

---

## 📝 Test Scenarios

### Complete User Journey
1. **New User**: Sign up → Verify email → Login
2. **Ask Question**: Create rich text question with tags
3. **Browse**: View questions list and navigate to detail
4. **Answer**: Post detailed answer with formatting
5. **Interact**: Vote on answers, accept best answer
6. **Notifications**: Check notification system
7. **Logout/Login**: Verify session persistence

### Edge Cases
- [ ] Very long question titles
- [ ] Questions with maximum tags (5)
- [ ] Questions without any answers
- [ ] Users with zero reputation
- [ ] Empty notification list
- [ ] Network failures and recovery

---

## ✅ Success Criteria

All checkboxes above should be ✅ for a successful implementation!

**Priority Levels:**
- 🔴 **Critical**: Must work (auth, posting, basic functionality)
- 🟡 **Important**: Should work (voting, notifications, rich text)
- 🟢 **Nice-to-have**: Could work (animations, advanced UI)

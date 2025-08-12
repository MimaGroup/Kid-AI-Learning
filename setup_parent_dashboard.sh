#!/bin/bash

echo "👨‍👩‍👧‍👦 Setting up Parent Dashboard System..."

# Install required packages
echo "📦 Installing required packages..."
pip install plotly

# Create database directory
mkdir -p data

# Initialize the database
echo "🗄️ Initializing parent dashboard database..."
python3 -c "
from parent_dashboard import ParentDashboard
dashboard = ParentDashboard()
print('✅ Database initialized successfully!')
"

# Create demo data (optional)
echo "🎯 Creating demo parent account..."
python3 -c "
from parent_dashboard import ParentDashboard
dashboard = ParentDashboard()

# Create demo parent
success = dashboard.create_parent_account('demo@parent.com', 'demo123', 'Demo Parent')
if success:
    print('✅ Demo parent account created!')
    print('📧 Email: demo@parent.com')
    print('🔒 Password: demo123')
    
    # Get parent ID and add demo kid
    parent = dashboard.authenticate_parent('demo@parent.com', 'demo123')
    if parent:
        dashboard.add_kid_profile(parent['id'], 'Alex', 8, '3rd Grade', '👦')
        dashboard.add_kid_profile(parent['id'], 'Emma', 10, '5th Grade', '👧')
        print('👶 Demo kids added: Alex (8) and Emma (10)')
else:
    print('⚠️ Demo account already exists or creation failed')
"

echo ""
echo "🎉 Parent Dashboard Setup Complete!"
echo ""
echo "🚀 To run the integrated app:"
echo "streamlit run integrated_app.py"
echo ""
echo "🔑 Demo Login:"
echo "Email: demo@parent.com"
echo "Password: demo123"

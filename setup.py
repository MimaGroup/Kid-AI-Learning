#!/usr/bin/env python3
"""
Setup script for AI Kids Learning Platform
Automated initialization and dependency checking
"""

import os
import sqlite3
import sys
import subprocess
import platform

def print_banner():
    """Display setup banner"""
    print("=" * 50)
    print("🚀 AI Kids Learning Platform Setup")
    print("=" * 50)
    print("Initializing your AI learning environment...")
    print()

def check_python_version():
    """Check if Python version is compatible"""
    print("🐍 Checking Python version...")
    
    version = sys.version_info
    if version.major < 3 or (version.major == 3 and version.minor < 8):
        print(f"❌ Python {version.major}.{version.minor} detected")
        print("⚠️  Python 3.8 or higher is required")
        return False
    
    print(f"✅ Python {version.major}.{version.minor}.{version.micro} detected")
    return True

def check_dependencies():
    """Check if all required packages are installed"""
    print("\n📦 Checking dependencies...")
    
    required_packages = {
        'streamlit': 'streamlit>=1.28.0',
        'pandas': 'pandas>=2.0.0'
    }
    
    missing_packages = []
    installed_packages = []
    
    for package, version_spec in required_packages.items():
        try:
            __import__(package)
            print(f"✅ {package} is installed")
            installed_packages.append(package)
        except ImportError:
            missing_packages.append(version_spec)
            print(f"❌ {package} is missing")
    
    if missing_packages:
        print(f"\n🔧 Installing missing packages...")
        try:
            subprocess.check_call([
                sys.executable, "-m", "pip", "install"
            ] + missing_packages)
            print("✅ All packages installed successfully")
            return True
        except subprocess.CalledProcessError:
            print("❌ Failed to install packages automatically")
            print(f"💡 Please run manually: pip install {' '.join(missing_packages)}")
            return False
    
    print("✅ All dependencies are satisfied")
    return True

def initialize_database():
    """Initialize the database with proper schema"""
    print("\n🗄️ Initializing database...")
    
    try:
        if not os.path.exists('integrated_app_fixed.py'):
            print("❌ integrated_app_fixed.py not found")
            print("💡 Please ensure the main application file is present")
            return False
        
        from integrated_app_fixed import ParentDashboard
        dashboard = ParentDashboard()
        
        conn = sqlite3.connect('parent_dashboard.db')
        cursor = conn.cursor()
        
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
        tables = cursor.fetchall()
        
        expected_tables = ['parents', 'kids', 'learning_sessions']
        existing_tables = [table[0] for table in tables]
        
        for table in expected_tables:
            if table in existing_tables:
                print(f"✅ Table '{table}' exists")
            else:
                print(f"❌ Table '{table}' missing")
        
        conn.close()
        print("✅ Database initialized successfully")
        return True
        
    except Exception as e:
        print(f"❌ Database initialization failed: {e}")
        print("💡 Please check the integrated_app_fixed.py file for errors")
        return False

def create_demo_data():
    """Create sample demo data for testing"""
    print("\n👨‍👩‍👧‍👦 Creating demo data...")
    
    try:
        from integrated_app_fixed import ParentDashboard
        dashboard = ParentDashboard()
        
        demo_email = "demo@example.com"
        demo_password = "demo123"
        demo_name = "Demo Parent"
        
        if dashboard.create_parent_account(demo_email, demo_password, demo_name):
            print("✅ Demo parent account created")
            print(f"   📧 Email: {demo_email}")
            print(f"   🔒 Password: {demo_password}")
            
            parent = dashboard.authenticate_parent(demo_email, demo_password)
            if parent:
                parent_id = parent['id']
                
                demo_kids = [
                    {"name": "Alex", "age": 8, "grade": "3rd Grade", "avatar": "👦"},
                    {"name": "Emma", "age": 6, "grade": "1st Grade", "avatar": "👧"}
                ]
                
                for kid in demo_kids:
                    if dashboard.add_kid_profile(
                        parent_id, kid["name"], kid["age"], kid["grade"], kid["avatar"]
                    ):
                        print(f"✅ Demo kid '{kid['name']}' created")
                
                print("✅ Demo data created successfully")
                return True
        else:
            print("ℹ️  Demo account may already exist")
            return True
            
    except Exception as e:
        print(f"❌ Demo data creation failed: {e}")
        return False

def main():
    """Main setup function"""
    print_banner()
    
    success_steps = 0
    total_steps = 4
    
    if check_python_version():
        success_steps += 1
    
    if check_dependencies():
        success_steps += 1
    
    if initialize_database():
        success_steps += 1
    
    if create_demo_data():
        success_steps += 1
    
    print("\n" + "=" * 50)
    print("📊 Setup Results")
    print("=" * 50)
    print(f"✅ Completed: {success_steps}/{total_steps} steps")
    
    if success_steps == total_steps:
        print("🎉 Setup completed successfully!")
        print("\n🚀 Ready to launch!")
        print("\n📋 Next steps:")
        print("1. Run: streamlit run integrated_app_fixed.py --server.port 8501")
        print("2. Open: http://localhost:8501")
        print("3. Login with demo account:")
        print("   📧 Email: demo@example.com")
        print("   🔒 Password: demo123")
        
    else:
        print("⚠️  Setup completed with some issues")
        print("💡 Please review the error messages above")
    
    print("=" * 50)
    return success_steps == total_steps

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n⚠️  Setup interrupted by user")
        print("💡 Run 'python setup.py' again to complete setup")
    except Exception as e:
        print(f"\n\n❌ Unexpected error during setup: {e}")
        print("📞 Please report this issue on GitHub")

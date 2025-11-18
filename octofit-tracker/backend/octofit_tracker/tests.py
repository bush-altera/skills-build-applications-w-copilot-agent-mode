from django.test import TestCase
from .models import User, Team, Activity, Leaderboard, Workout

class UserModelTest(TestCase):
    def test_create_user(self):
        team = Team.objects.create(name="Test Team")
        user = User.objects.create(username="testuser", email="test@example.com", first_name="Test", last_name="User", team=team)
        self.assertEqual(user.username, "testuser")
        self.assertEqual(user.team.name, "Test Team")

class TeamModelTest(TestCase):
    def test_create_team(self):
        team = Team.objects.create(name="Team Alpha")
        self.assertEqual(team.name, "Team Alpha")

class ActivityModelTest(TestCase):
    def test_create_activity(self):
        team = Team.objects.create(name="Team Beta")
        user = User.objects.create(username="activityuser", email="activity@example.com", first_name="Activity", last_name="User", team=team)
        activity = Activity.objects.create(user=user, activity_type="Running", duration=30, calories_burned=300, date="2025-11-18")
        self.assertEqual(activity.activity_type, "Running")
        self.assertEqual(activity.user.username, "activityuser")

class LeaderboardModelTest(TestCase):
    def test_create_leaderboard(self):
        team = Team.objects.create(name="Team Gamma")
        leaderboard = Leaderboard.objects.create(team=team, total_points=100, rank=1)
        self.assertEqual(leaderboard.team.name, "Team Gamma")
        self.assertEqual(leaderboard.rank, 1)

class WorkoutModelTest(TestCase):
    def test_create_workout(self):
        workout = Workout.objects.create(name="Push Ups", description="Upper body exercise", difficulty="Easy", duration=10)
        self.assertEqual(workout.name, "Push Ups")
        self.assertEqual(workout.difficulty, "Easy")
